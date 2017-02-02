        public static bool CnpjValido(this string cnpj, bool dispararExcecao = false)
        {
            cnpj = Regex.Replace(cnpj ?? string.Empty, "[^0-9]", string.Empty).PadLeft(14, '0');

            if (!cnpj.Length.Equals(14) || new string(cnpj[0], 14).Equals(cnpj))
                if (dispararExcecao)
                    throw new DadosInvalidosException("CNPJ deve possuir 14 números.");
                else
                    return false;

            if (new string(cnpj[0], 14).Equals(cnpj))
                if (dispararExcecao)
                    throw new DadosInvalidosException("CNPJ não deve possuir todos os números iguais.");
                else
                    return false;

            var digitos = cnpj.Select(s => Convert.ToUInt16(s.ToString(CultureInfo.InvariantCulture))).ToArray();
            const string sequencia = "6543298765432";
            for (var i = 0; i <= 1; i++)
            {
                var soma = 0;
                for (var j = 0; j <= 11 + i; j++)
                    soma += digitos[j] * Convert.ToInt32(sequencia.Substring(j + 1 - i, 1));

                if (digitos[12 + i].Equals((ushort)(soma * 10 % 11 % 10)))
                    continue;

                if (dispararExcecao)
                    throw new DadosInvalidosException("CNPJ inválido.");

                return false;
            }

            return true;
        }

        public static bool CpfValido(this string cpf, bool dispararExcecao = false)
        {
            cpf = Regex.Replace(cpf ?? string.Empty, "[^0-9]", string.Empty).PadLeft(11, '0');

            if (!cpf.Length.Equals(11))
                if (dispararExcecao)
                    throw new DadosInvalidosException("CPF deve possuir 11 números.");
                else
                    return false;

            if (cpf.Equals("12345678909"))
                if (dispararExcecao)
                    throw new DadosInvalidosException("CPF inválido.");
                else
                    return false;

            if (new string(cpf[0], 11).Equals(cpf))
                if (dispararExcecao)
                    throw new DadosInvalidosException("CPF não deve possuir todos os números iguais.");
                else
                    return false;

            var digitos = cpf.Select(s => Convert.ToUInt16(s.ToString(CultureInfo.InvariantCulture))).ToArray();
            for (var i = 0; i <= 1; i++)
            {
                var soma = 0;
                for (var j = 0; j <= 8 + i; j++)
                    soma += digitos[j] * (10 + i - j);

                if (digitos[9 + i].Equals((ushort)(soma * 10 % 11 % 10)))
                    continue;

                if (dispararExcecao)
                    throw new DadosInvalidosException("CPF inválido.");

                return false;
            }

            return true;
        }