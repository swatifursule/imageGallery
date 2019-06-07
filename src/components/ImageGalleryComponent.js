import React from 'react'
import { Container, Row, Col, Image, Button} from 'react-bootstrap';

const ThumbnailComponent = ({title,author,link,tags,key,thumbnail,index}) => (
    <Col xs={6} md={4}>

        <Image src={thumbnail} key={key}>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>
                <Button href={link} bsStyle="primary">View on Flickr</Button>&nbsp;

            </p>
        </Image>

    </Col>
)

export default ({items}) => (
    <Container>
        <Row className="gallery-row">
            {items.map((item,index) => (<ThumbnailComponent {...item} index={index+1}/>))}
        </Row>
    </Container>
)
/* <LimitedTagitComponent tags={tags}/> */