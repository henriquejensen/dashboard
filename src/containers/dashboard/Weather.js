import React, { Component } from "react";

export default class Weather extends Component {
	render() {
		return (
		<div className="col-md-4">
			<div className="row">
				<div className="panel panel-default" id="weather">
					<div className="panel-body" style={{padding:8}}>
						<div style={{display:"flex"}}>
							<div style={{margin:"0 5px", width:"60%"}}>
								<p style={{marginTop:10, marginBottom:0}}>Campinas</p>
								<h1 style={{marginTop:0}}>22° C</h1>
							</div>
							<div>
							<div className='text-center'>
								<img src="http://www.mikeafford.com/store/store-images/ms02_example_heavy_rain_showers.png" width="80" />
							</div>
							</div>
						</div>
						
						<div>
							<div style={{width:"100%", display:"flex", textAlign:"center"}}>
							<div style={{width:"20%", paddingTop:"7px"}}>TER</div>
							<div style={{width:"56%", }}><img src="http://www.mikeafford.com/store/store-images/ms02_example_heavy_rain_showers.png" width="35" /></div>
							<div style={{width:"34%", paddingTop:"7px"}}>20°/25°</div>
							</div>

							<div style={{width:"100%", display:"flex", textAlign:"center"}}>
							<div style={{width:"20%", paddingTop:"7px"}}>TER</div>
							<div style={{width:"56%"}}><img src="http://www.mikeafford.com/store/store-images/ms02_example_heavy_rain_showers.png" width="35" /></div>
							<div style={{width:"34%", paddingTop:"7px"}}>20°/25°</div>
							</div>

							<div style={{width:"100%", display:"flex", textAlign:"center"}}>
							<div style={{width:"20%", paddingTop:"7px"}}>TER</div>
							<div style={{width:"56%"}}><img src="http://www.mikeafford.com/store/store-images/ms02_example_heavy_rain_showers.png" width="35" /></div>
							<div style={{width:"34%", paddingTop:"7px"}}>20°/25°</div>
							</div>
						</div>

						<div style={{marginTop:"12px"}}>
							<input type="search" name="searchWeather" placeholder="Insira aqui a cidade" style={{color:"black", width:"99%", paddingLeft:"5px"}} />
							<button className="btn btn-info btn-block" style={{margin:"5px 0"}}>
							Pesquisar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
}