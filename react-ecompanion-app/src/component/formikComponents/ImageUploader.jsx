import React from 'react';
import { ErrorMessage } from 'formik';
import {ImageUploaderComponent} from './ImageUploaderComponent'

export class ImageUploader extends React.Component {
    render() {
        return (
            <>
                <ImageUploaderComponent {...this.props} />
                <ErrorMessage name={this.props.value} >
                    {msg => <span className="error">{msg}</span>}
                </ErrorMessage>
            </>
        );
    }
}