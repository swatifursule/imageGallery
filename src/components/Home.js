import React from 'react'
import {Jumbotron, Alert, Button  } from 'react-bootstrap'

const LoadingIndicator = () => (
    <div>
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
    </div>
)

const Error = ({error,handleRefresh}) => (
    <Alert bsStyle="danger" >
        <h4>Images could not be retrieved</h4>
        <p>{error}
            <Button bsStyle="primary" onClick={handleRefresh}>Refresh</Button>
        </p>
    </Alert>
)

export default ({isLoading=false,error=false,handleRefresh}) => (
    <Jumbotron>
        {isLoading?<LoadingIndicator/>:''}
        {error?<Error error={error} handleRefresh={handleRefresh}/>:''}
        <h1> Flickr Search App</h1>
        <p>Search Flickr's public feed for your favourite tags.</p>
    </Jumbotron>
)