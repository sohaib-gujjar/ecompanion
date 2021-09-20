import React from 'react';
import { ErrorMessage } from 'formik';
import { ImageUploaderComponent } from './ImageUploaderComponent'

export function ImageUploader(props) {
    return (
        <>
            <ImageUploaderComponent {...props} />
            <ErrorMessage name={props.value} >
                {msg => <span className="error">{msg}</span>}
            </ErrorMessage>
        </>
    );
}