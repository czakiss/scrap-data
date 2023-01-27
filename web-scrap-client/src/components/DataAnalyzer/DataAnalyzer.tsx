import ChartPreview from "./components/ChartPreview";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { FormEvent, useEffect, useRef, useState } from "react";
import { getAllData, initData, removeData } from "../Api";

const DataAnalyzer = () => {
  const isFirstRender = useRef(true);
  const [dataArray, setDataArray] = useState([]);
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState({
    name: "Zakopane",
    url: "https://pogoda.onet.pl/prognoza-pogody/zakopane-365801",
    selector: ".mainParams > .temperature > .temp",
  });

  const handleClose = () => setShow(false);
  const handleSave = async () => {
    await initData({
      name: newData.name,
      url: newData.url,
      selector: newData.selector,
      isNumber: true,
    });
    getData().then((data) => {
      setDataArray(data);
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDelete = async (id: number) => {
    const isRemoved = await removeData(id);
    if (isRemoved) {
      getData().then((data) => {
        setDataArray(data);
      });
    }
  };
  const renderCards = () => {
    let cards: any[] = [];
    if (dataArray != null && Array.isArray(dataArray) && dataArray.length > 0) {
      cards = cards.concat(
        dataArray.map((data, index) => {
          return (
            <ChartPreview
              onDelete={onDelete}
              key={`${index}-chart`}
              data={data}
            />
          );
        })
      );
    }
    return cards;
  };

  const getData = async () => {
    return getAllData();
  };

  useEffect(() => {
    if (isFirstRender.current) {
      getData().then((data) => {
        setDataArray(data);
      });
      setInterval(() => getData().then((data) => setDataArray(data)), 1000);
    }
  }, []);

  const onChangeInput = (event: FormEvent<HTMLElement>, key: string) => {
    // @ts-ignore
    const value = event.target.value;
    setNewData({ ...newData, [key]: value });
  };

  return (
    <div>
      <Container className="my-3 ">
        <Button variant="primary" onClick={handleShow}>
          Add data
        </Button>
        <Row className="justify-content-md-center">{renderCards()}</Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup
            className="mb-3"
            onChange={(event) => onChangeInput(event, "name")}
          >
            <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-label="name"
              aria-describedby="name"
              value={newData.name}
            />
          </InputGroup>
          <InputGroup
            className="mb-3"
            onChange={(event) => onChangeInput(event, "url")}
          >
            <InputGroup.Text id="basic-addon1">url</InputGroup.Text>
            <Form.Control
              placeholder="website"
              aria-label="website"
              aria-describedby="website"
              value={newData.url}
            />
          </InputGroup>
          <InputGroup
            className="mb-3"
            onChange={(event) => onChangeInput(event, "selector")}
          >
            <InputGroup.Text id="basic-addon1">selector</InputGroup.Text>
            <Form.Control
              placeholder="selector"
              aria-label="selector"
              aria-describedby="selector"
              value={newData.selector}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataAnalyzer;
