import React from 'react';

export class ImageUploaderComponent extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            active: false,
            imageSrc: null,
            loaded: false,
            baseColor: 'lightgray',
            activeColor: 'green',
            overlayColor: 'rgba(255,255,255,0.3)'
        }
        this.onDragEnter  = this.onDragEnter.bind(this);
        this.onDragLeave  = this.onDragLeave.bind(this);
        this.onDrop       = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount=()=>{
        if(this.props.data){
            if(typeof this.props.data === 'string'){
                this.setState({ 
                    imageSrc: this.props.data, 
                    loaded: true 
                });
            }
            else{
                var reader = new FileReader();
                reader.onload = (e) => {
                    if(!this.props.isUpdate){
                    this.setState({ 
                        imageSrc: reader.result, 
                        loaded: true 
                    }); 
                    }
                }
                reader.readAsDataURL(this.props.data);
            }
        }
    }
    
    onDragEnter(e) {
        this.setState({ active: true });
    }
    
    onDragLeave(e) {
        this.setState({ active: false });
    }
    
    onDragOver(e) { 
        e.preventDefault(); 
    }
    
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }
    
    onFileChange(e, propfile) {
        if(typeof e.target.files==='undefined') return // just do nothing on "empty drag"
        var file = propfile || e.target.files[0],
        pattern = "",
        reader = new FileReader();
        if(!file) return;
            
        if (!file.type.match(pattern)) {
            alert('Invalid Image Format');
            return;
        }
        if(this.props.onChange){
            this.props.onChange(this.props.value,file);
        }
        if(this.props.onInputChange){
            this.props.onInputChange(file);
        }
        
        this.setState({ loaded: false });
        
        reader.onload = (e) => {
            if(!this.props.isUpdate){
            this.setState({ 
                imageSrc: reader.result, 
                loaded: true 
            }); 
            }
        }
        reader.readAsDataURL(file);
    }
    
    getFileObject() {
        return this.refs.input.files[0];
    }
    
    getFileString() {
        return this.state.imageSrc;
    }
    
    render() {
        let state = this.state,
            labelClass  = `uploader ${state.loaded && 'loaded'}`,
            iconDisplay   = state.active 
                ? 'flex'
                : (state.loaded) 
                    ? 'none'
                    : 'flex';
        return(
            <label 
                className={labelClass}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave} 
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                style={{height:this.props.height, width:this.props.width}}>
                <img src={state.imageSrc} className= {`uploaderimg ${this.state.loaded ? 'loaded' : 'uploaderinput'}`} style={{objectFit:"cover"}} alt="" />
                <div className="uploader-preloaded" style={{ display: iconDisplay}}>
                    <span className="title">{this.props.title}</span>
                    <span className="place-holder">{this.props.placeholder}</span>
                    {this.props.wide && <div className="uploadericon" >
                        <img src="/images/icon_upload.svg"
                        style={{ display: iconDisplay , height: "20%" }} alt="not found"></img>
                        <span>click the button and select your picture<br/>or upload it by drag and drop.</span>
                    </div>}
                </div>
                
                <input type="file" className="uploaderinput" accept="image/*" onChange={this.onFileChange} ref="imageInput" />
            </label>
        );
    }
}