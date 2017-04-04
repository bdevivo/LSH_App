import React, {Component, PropTypes} from 'react';
import {Row, Col, Button,} from 'react-bootstrap';
import QuestionEditContainer from './QuestionEditContainer';
import * as questionHelpers from '../../../utils/helpers/questionHelpers';
import CSSModules from 'react-css-modules';
import styles from './Question.css';
import {findDOMNode} from 'react-dom';
import ItemTypes from './ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';

let _ = require('lodash');

const questionItemSource = {
    beginDrag(props) {
        return {
            id: props.question._id,
            visualIndex: props.visualIndex
        };
    }
};

const questionItemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().visualIndex;
        const hoverIndex = props.visualIndex;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        //const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const domNode = findDOMNode(component);
        const hoverBoundingRect = domNode.childNodes[0].getBoundingClientRect();


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

// The last 3 props are injected by the collectSource and collectTarget functions below
const Question = ({question, isExpanded, handleToggle, modalVisible, onAddQuestionClose, isDragging, connectDragSource, connectDragPreview, connectDropTarget, isInReorderState}) => {

    let question_body;
    let questionDetails;
    if (isExpanded) {

        if (questionHelpers.questionHasSelectOptions(question)) {
            let sortedOptions = question.selectOptionItems.sort((a, b) => { return a.index - b.index; });
            let questionOptions = sortedOptions.map((opt, i) =>
                <li key={i}>{opt.text}</li>
            );

            questionDetails = (
                <div>
                    <label>Options</label>
                    <ul>{questionOptions}</ul>
                </div>);
        }
        else if (question.answerType === "boolean") {
            questionDetails = (
                <div>
                    <p>
                        <label>Text for "yes" option: </label>
                        {' '}
                        {question.booleanOptions.yesText}
                    </p>
                    <p>
                        <label>Text for "no" option: </label>
                        {' '}
                        {question.booleanOptions.noText}
                    </p>
                </div>);
        }

        let altText = (<p><b>Alternate text for resources: </b> {question.textForResources}</p>);
        let questionType = questionHelpers.getAnswerTypeDisplayString(question.answerType);
        let questionFunction = question.hasOwnProperty("function") && question.function !== "none"
            ? <p><b>Function:</b> {question.function}</p>
            : null;

        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.name}</p>
                <p><b>Text: </b> {question.text}</p>
                {question.textForResources.length > 0 && altText}
                {questionFunction}
                <p><b>Type:</b> {questionType}</p>
                {questionDetails}
            </div>);
    }
    else { // question is collapsed
        question_body =
            (<div>
                <p><b>{question.index}: </b> {question.name}</p>
            </div>);
    }

    let buttonSymbol = isExpanded ? "-" : "+";

    const dragStyle = {
        cursor: 'move',
        display: 'block',
        marginRight: '10px'
    };

    const opacity = isDragging ? 0 : 1;

    let dragSource = isInReorderState
        ? connectDragSource(<div>
                <Col md={1} style={dragStyle}>
                    <span className="glyphicon glyphicon-move"></span>
                </Col>
            </div>)
        : null;

    return connectDragPreview(connectDropTarget(
        <div>
            <Col md={7}>
                <Row styleName="questionDiv" style={{opacity}}>

                        <div>

                            {dragSource}

                            <Col md={1} styleName="toggleButtonCol">
                                <Button className="btn btn-xs btn-default" onClick={handleToggle}>{buttonSymbol}</Button>
                            </Col>

                            <Col md={8} styleName="questionBodyDiv">
                                { question_body }
                            </Col>

                        </div>

                </Row>
            </Col>

            <Col md={2}>
                <QuestionEditContainer
                    question={question}
                    modalVisible={modalVisible}
                    onAddQuestionClose={onAddQuestionClose}
                    isInReorderState={isInReorderState}
                />
            </Col>

        </div>
    ));
};


Question.propTypes = {
    question: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    onAddQuestionClose: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    visualIndex: PropTypes.number.isRequired,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isInReorderState: PropTypes.bool.isRequired
};

export default _.flow(
    DragSource(ItemTypes.QUESTION, questionItemSource, collectSource),
    DropTarget(ItemTypes.QUESTION, questionItemTarget, collectTarget)
)(CSSModules(Question, styles));


