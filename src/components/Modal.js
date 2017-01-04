import React, { Component } from "react";
import Modal from "react-modal";

const customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.6)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}

class MyModal extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Modal
                isOpen={this.props.IsModalOpen}
                onRequestClose={this.props.closeModal}
                style={customStyle}
                contentLabel="Modal">

                {this.props.children}
                
            </Modal>
        )
    }
}

export default MyModal;