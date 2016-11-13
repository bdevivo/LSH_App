import React from 'react';
import ReactDOM from 'react-dom';


export default class FileInput extends React.Component {

   constructor(props) {
      // FileReader compatibility warning.
      super(props);

      this.triggerInput = this.triggerInput.bind(this);
      this.handleChange = this.handleChange.bind(this);

      const win = typeof window === 'object' ? window : {};
      if ((typeof window === 'object') && (!win.File || !win.FileReader || !win.FileList || !win.Blob)) {
         console.warn(
            '[react-file-reader-input] Some file APIs detected as not supported.' +
            ' File reader functionality may not fully work.'
         );
      }
   }
   handleChange(e) {
      const files = [];
      for (let i = 0; i < e.target.files.length; i++) {
         // Convert to Array.
         files.push(e.target.files[i]);
      }

      // Build Promise List, each promise resolved by FileReader.onload.
      Promise.all(files.map(file => new Promise((resolve, reject) => {
         let reader = new FileReader();

         reader.onload = result => {
            // Resolve both the FileReader result and its original file.
            resolve([result, file]);
         };

         // Read the file with format based on this.props.as.
         switch ((this.props.as || 'url').toLowerCase()) {
            case 'binary': {
               if (reader.readAsBinaryString) {
                  reader.readAsBinaryString(file);
            }
            else {
                  // Catering for IE 10/11
                  // reader.onload = e => {
                  //    const bytes = new Uint8Array(e.target.result);
                  //    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
                  //    alert(binary);
                  // };
                  reader.readAsArrayBuffer(file);
               }
               break;
            }
            case 'buffer': {
               reader.readAsArrayBuffer(file);
               break;
            }
            case 'text': {
               reader.readAsText(file);
               break;
            }
            case 'url': {
               reader.readAsDataURL(file);
               break;
            }
         }
      })))
         .then(zippedResults => {
            // Run the callback after all files have been read.
            this.props.onChange(e, zippedResults);
         });
   }

   triggerInput(e) {
      ReactDOM.findDOMNode(this._reactFileReaderInput).click();
   }

   render() {
      const hiddenInputStyle = this.props.children ? {
         // If user passes in children, display children and hide input.
         position: 'absolute',
         top: '-9999px'
      } : {};

      const {as, ...rest} = this.props;

      return (<div className="_react-file-reader-input"
                  onClick={this.triggerInput}>
         <input {...rest} children={undefined} type="file"
                onChange={this.handleChange}
                ref={c => this._reactFileReaderInput = c}
                style={hiddenInputStyle}/>

         {this.props.children}
      </div>);
   }
}

FileInput.propTypes = {
   as: React.PropTypes.oneOf(['binary', 'buffer', 'text', 'url']),
   children: React.PropTypes.object,
   onChange: React.PropTypes.func,
};
