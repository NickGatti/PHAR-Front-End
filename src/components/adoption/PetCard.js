import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from "reactstrap";

import Questions from "./Questions";

class PetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = e => {
    !e ? null : e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  render() {
    let options = this.props.pet.options.option.map((option, key) => {
      return <td key={key}>{option["$t"]}</td>;
    });
    let breeds = !this.props.pet.breeds.breed.length ? <td>{this.props.pet.breeds.breed["$t"]}</td> : this.props.pet.breeds.breed.map((breed, key) => {
      return <td key={key}>{breed["$t"]}</td>;
    });

    return (
      <Col className="mt-4" xs="4" sm="4" md="4" lg="4" xl="4">
        <Card>
          <CardImg
            top
            width="100%"
            src={this.props.pet.media.photos.photo[3]["$t"]}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{this.props.pet.name["$t"]}</CardTitle>
            <div>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {this.props.pet.name["$t"]}
                </ModalHeader>
                <ModalBody>{this.props.pet.description["$t"]}</ModalBody>
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Options</th>
                      {options}
                    </tr>
                    <tr>
                      <th scope="row">Age</th>
                      <td>{this.props.pet.age["$t"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Size</th>
                      <td>{this.props.pet.size["$t"]}</td>
                    </tr>
                    <tr>
                      <th scope="row">Breeds</th>
                      {breeds}
                    </tr>
                    <tr>
                      <th scope="row">ID</th>
                      <td>{this.props.pet.id["$t"]}</td>
                    </tr>
                  </tbody>
                  <Questions />
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <Form action='https://guarded-bastion-60433.herokuapp.com/questions' method='POST'>
                      <FormGroup>
                        <Label for="submitQuestion">Question</Label>
                        <Input type="question" name="question" id="submitQuestion" placeholder="Ask a Question" />
                        <Input style={{ display: "none" }} type="petID" name="petID" id="petID" value={this.props.pet.id["$t"]} />
                      </FormGroup>
                      <Button style={{ padding: "3px", paddingLeft: "6px", paddingRight: "6px" }} color="primary">
                        Ask
                        </Button>
                    </Form>
                  </Col>
                  
                </Table>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>
                    Got it!
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <CardSubtitle>Description</CardSubtitle>
            {this.props.pet.description["$t"].slice(0, 60)}...&nbsp;
            <a href="#" onClick={e => this.toggle(e)}>
              More
            </a>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default PetCard;
