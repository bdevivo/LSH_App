import React, {PropTypes as T} from 'react';
import {FormControl, Button, Row, Col} from 'react-bootstrap';
import OptionItem from './OptionItem';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';

const SelectOptionForm = ({options, onAddOptionTextChange, onAddOption, onEditItem, onDeleteItem}) => {

let optionItemList = options.map(item => <OptionItem
                                             item={item}
                                             key={item.index}
                                             onEditItem ={onEditItem}
                                             onDeleteItem={onDeleteItem} />);


   return (
      <div>
         <h2>Options</h2>

         <Row>
            <Col>
               <FormControl className="text" placeholder="Add option text" onChange={onAddOptionTextChange}/>
            </Col>
            <Col>
               <Button onClick={onAddOption}>Add</Button>
            </Col>
         </Row>

         <Row>
            <Col>
               <FormControl className="textInput" placeholder="Add option text" onChange={onAddOptionChange}/>
            </Col>
            <Col>
               <Button onClick={onAddOption}>Add</Button>
            </Col>
         </Row>

         {optionItemList}



      </div>
   );


};

SelectOptionForm.propTypes = {
   options: T.array.isRequired,
   onAddOptionTextChange: T.func.isRequired,
   onAddOption: T.func.isRequired,
   onEditItem: T.func.isRequired,
   onDeleteItem: T.func.isRequired,
};

export default CSSModules(SelectOptionForm, styles);
