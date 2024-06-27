import './App.css'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './bt/sidebar';
import Table from './bt/table';

function App() {


  return (
    <>
  <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
        <Sidebar></Sidebar>
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <h1 className='title'>Table Information Student</h1>
          <Table></Table>
         </Col>
      </Row>
     </Container>
    </>
  )
}

export default App
