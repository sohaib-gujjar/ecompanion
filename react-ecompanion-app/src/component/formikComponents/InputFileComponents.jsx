import React from 'react';
import {  ErrorMessage } from 'formik';

export class InputFile extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-25">
                    <label htmlFor={this.props.value}>{this.props.title}</label>
                </div>
                <div className="col-75">
                    <input id={'formik-input-sf-' + this.props.value} name={this.props.value}
                        type="file" className="inputfile"
                        placeholder={this.props.placeholder ? this.props.placeholder : '...'}
                        onChange={e => { this.props.onChange(this.props.value, e.currentTarget.files[0]); }} />
                    <ErrorMessage name={this.props.value} component="span" className="error" />
                </div>
            </div>
        );
    }
}

export class InputMultipleFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.initialValues
        }
    }
    onFileChange = (e) => {
        console.log(typeof e.target.files, e.target.files.length);

        Array.from(e.target.files).forEach(file => {
            console.log("Do something with " + file.name);
            this.state.files.push(file);
            /*var pattern = "",
            reader = new FileReader();
            if(!file) return;
                
            if (!file.type.match(pattern)) {
                alert('Invalid Image Format');
                return;
            }
            reader.onload = (e) => {
                this.state.files.push(reader.result);//push reader.result <- file
            }
            reader.readAsDataURL(file);*/
        });
        console.log(this.state.files);
        if (this.props.onChange) {
            this.props.onChange(this.props.value, this.state.files);
        }
        e.currentTarget = null;
        this.forceUpdate();
    }
    removeItem(index) {
        console.log(index);
        let newList = this.state.files;
        newList.splice(index, 1);
        this.setState({ files: newList, val: index });
        this.props.onChange(this.props.value, newList);
        this.forceUpdate();
    }
    render() {
        return (
            <div className="row">
                <div className="col-25">
                    <label htmlFor={this.props.value}>{this.props.title}</label>
                </div>
                <div className="col-75">
                    {
                        this.state.files.map((val, index) => {
                            return (
                                <div key={index} style={{ width: '100%', marginTop: '2%', marginBottom: '2%', background: '#fafafa', padding: '2%' }}>
                                    <span id={'formik-input-mf-' + index + '-' + this.props.value} name={this.props.value}
                                        type="file"
                                        placeholder={this.props.placeholder ? this.props.placeholder : '...'}
                                    >{val.name}</span>

                                    <button className="close" type="button" value={index}
                                        onClick={(e) => { this.removeItem(e.target.value) }}>x</button>
                                </div>
                            );
                        })
                    }
                    <input id={'formik-input-mf-' + this.props.value} name={this.props.value}
                        type="file" className="inputfile" multiple label={this.props.title}
                        placeholder={this.props.placeholder ? this.props.placeholder : '...'} onChange={e => { this.onFileChange(e); }} />
                    <ErrorMessage name={this.props.value} className="error" component="span" />
                </div>
            </div>
        );
    }
}