import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Modal from './modal'
import { Container, Dropdown} from 'react-bootstrap';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Spinner';

export default class table extends React.Component {

    state = {
        show: false,
        modalData: {},
        pagePerRow: 10,
        tableRef: null,
        text: 10
    }

    handleClose = () => {
        this.setState({ show: false });
    }
    handleShow = (res) => {
        this.setState({ show: true, modalData: res });
    }

    columnDefs = {
        wrapText: true,
        flex: 1,
        headerClass: { textAlign: 'center' },
        sortable: true,
        filter: true
    }

    handlePagination = (e) => {
        this.setState({ pagePerRow: parseInt(e.target.outerText), text: e.target.outerText }, () => {
            this.state.tableRef.paginationSetPageSize(Number(this.state.pagePerRow));
        })
    }


    onGridReady = (params) => {
        this.setState({ tableRef: params.api });
    }

    actionButton = (params) => {
        
        if(document.getElementById(params.data.ifsc).getElementsByTagName('Button')[0].innerHTML==='click me'){
             this.props.toogle(params.data,1);
             document.getElementById(params.data.ifsc).getElementsByTagName('Button')[0].innerHTML='I got clicked';
        }else{
            this.props.toogle(params.data,0);
            document.getElementById(params.data.ifsc).getElementsByTagName('Button')[0].innerHTML='click me';
        }
        
    }

    render() {

        return (

            <Container>
                {this.props.isLoading
                    ? <Spinner />
                    : <>

                        <div className="ag-theme-alpine" style={{ width: '99%', height: '500px' }}>
                            <Modal
                                show={this.state.show}
                                handleClose={this.handleClose}
                                handleShow={this.handleShow}
                                modalData={this.state.modalData}
                            />
                            <AgGridReact
                                defaultColDef={this.columnDefs}
                                rowData={this.props.rowData}
                                className="ag-grid"
                                pagination={true}
                                onRowClicked={(e) => { this.handleShow(e.data) }}
                                rowHeight="80"
                                paginationPageSize={this.state.pagePerRow}
                                onGridReady={this.onGridReady}
                                rowSelection={'multiple'}


                            >
                                {/* */}
                                {/* <AgGridColumn headerName="FAV" field="ifsc" flex="1.5" cellRendererFramework={(params)=><div> <button onClick={()=>this.actionButton(params)}> click me </button></div>} ></AgGridColumn> */}

                                <AgGridColumn headerName="BANK" field="bank_name" flex="1.5" cellRendererFramework={(params)=><div id={params.data.ifsc}> <button onClick={()=>this.actionButton(params)}>{this.props.favourites.includes(params.data) ? 'I got clicked' : 'click me'}</button></div>}></AgGridColumn>
                                <AgGridColumn headerName="BANK" field="bank_name" flex="1.5"></AgGridColumn>
                                <AgGridColumn headerName="IFSC" field="ifsc" flex="1"  ></AgGridColumn>
                                <AgGridColumn headerName="BRANCH" field="branch" flex="1" ></AgGridColumn>
                                <AgGridColumn headerName="BANK ID" field="bank_id" flex="1" ></AgGridColumn>
                                <AgGridColumn headerName="ADDRESS" field="address" flex="2" ></AgGridColumn>

                            </AgGridReact>
                            <div className='row' style={{ 'margin-top': '5px' }}>
                                <div className='col-12' style={{ 'textAlign': 'right' }}>
                                    <p style={{ display: 'inline-block', marginRight: '10px' }}>Pages per row</p>
                                    <Dropdown size="sm" style={{ display: 'inline-block' }}>

                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {this.state.text}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(e) => { this.handlePagination(e) }}>10</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => { this.handlePagination(e) }}>50</Dropdown.Item>
                                            <Dropdown.Item onClick={(e) => { this.handlePagination(e) }}>100</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>

                        </div>
                    </>}
            </Container>

        );
    }

};

