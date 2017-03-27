import React, {PropTypes as T} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import styles from './SelectOptions.css';
import CSSModules from 'react-css-modules';
import ItemTypes from '../ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';

let _ = require('lodash');

const optionItemSource = {
    beginDrag(props) {
        return {
            id: props.item.id,
            visualIndex: props.visualIndex
        };
    }
};

const optionItemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().visualIndex;
        const hoverIndex = props.visualIndex;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Perform the move
        props.moveItem(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        //console.log(`changing dragged item index from ${monitor.getItem().index} to ${hoverIndex}`);
        monitor.getItem().visualIndex = hoverIndex;
    }
};

function collectSource(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),

        // Call this function inside render()
        // to specify the node that will be snapshotted when dragging
        connectDragPreview: connect.dragPreview(),

        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

function collectTarget(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),

        // You can ask the monitor about the current drag state:
        // isOver: monitor.isOver(),
        // isOverCurrent: monitor.isOver({ shallow: true }),
        // canDrop: monitor.canDrop(),
        // itemType: monitor.getItemType()
    };
}


// The last 4 props are injected by the collectSource and collectTarget functions
const OptionItem = ({item, onEditItem, onDeleteItem, isDragging, connectDragSource, connectDragPreview, connectDropTarget}) => {

    const style = {
        width: '90%',
        border: '1px dashed gray',
        padding: '0.5rem 0rem',
        marginLeft: '5px',
        marginBottom: '.5rem',
        backgroundColor: 'white'
    };

    const dragStyle = {
        cursor: 'move',
        display: 'inline-block',
        marginRight: '10px'
    };

    const opacity = isDragging ? 0 : 1;

    return connectDragPreview(connectDropTarget(
        <div>
            <Row style={{...style, opacity}}>
                <Col md={3}>

                    {connectDragSource(
                        <div style={dragStyle}><span className="glyphicon glyphicon-move"></span></div>
                    )}

                    {' '}
                    <a onClick={() => onEditItem(item.id)}><span className="glyphicon glyphicon-pencil"></span></a>
                    {' '}
                    <a onClick={() => onDeleteItem(item.id)}><span className="glyphicon glyphicon-remove"></span></a>
                </Col>


                <Col md={8} styleName="itemTextCol">
                    <div>
                        {item.text}
                    </div>
                </Col>

            </Row>
        </div>
    ));

};

OptionItem.propTypes = {
    item: T.object.isRequired,
    visualIndex: T.number.isRequired,
    onEditItem: T.func.isRequired,
    onDeleteItem: T.func.isRequired,
    moveItem: T.func.isRequired,
    isDragging: T.bool,
    connectDragSource: T.func,
    connectDragPreview: T.func,
    connectDropTarget: T.func,

};


export default _.flow(
    DragSource(ItemTypes.SELECTOPTION, optionItemSource, collectSource),
    DropTarget(ItemTypes.SELECTOPTION, optionItemTarget, collectTarget)
)(CSSModules(OptionItem, styles));

