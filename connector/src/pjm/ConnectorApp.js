import React, { useEffect } from "react";
import ItemList from "./ItemComponents";

import styles from './css/connector-app.css';

/**
 * item의 구성
 * id, title, contents, ...
 */


const items = new ItemList();

function ConnectorApp(props) {
    const [list, setList] = React.useState(props.qnaStorage);
    items.setList(list);
    const qnaStorage = {
        list,
        setList
    }
    return (
        <div className="container">
            <QnA qnaStorage={qnaStorage} />
        </div >
    )
}

function QnA(props) {
    return (
        <div className="qna-area">
            <div className="qna-tag-title">
                <span className="logo">Connector</span>
                <span className="board-title">개발자 Q&A 게시판</span>
            </div>
            <div className="qna-tag-list">
                <Tag tagName="All" selected="selected" />
                <Tag tagName="JS" />
                <Tag tagName="HTML" />
                <Tag tagName="CSS" />
                <Tag tagName="React" />
            </div>
            <BoardArea qnaStorage={props.qnaStorage} />
        </div>
    )
}

function Tag(props) {
    return (
        <div className={`qna-tag-element${props.selected ? " selected" : ""}`}>
            <span>{props.tagName}</span>
        </div>
    )
}

function BoardArea(props) {
    const [isModal, setIsModal] = React.useState(false);
    const [isNew, setIsNew] = React.useState(0);
    const [list, setList] = [props.qnaStorage.list, props.qnaStorage.setList];

    const setInitState = () => {
        setIsModal(false);
        setIsNew(isNew + 1);
        setList(items.list);
    }

    React.useEffect(() => {
        window.localStorage.setItem('qnaStorage', JSON.stringify(list));
    }, [isNew, list]);

    const modal = {
        isModal,
        setIsModal
    }

    const writeHandler = (event) => {
        setIsModal(true);
    }

    return (
        <div className="qna-board-list">
            <button className="qna-board-button" onClick={writeHandler}>글쓰기</button>
            {isModal ? <BoardModal modal={modal} setInitState={setInitState} /> : null}

            {
                items.list.map((listItem, index) => {
                    return <BoardItem key={index} listItem={listItem} setInitState={setInitState} />
                })
            }
        </div>
    )
}

function BoardModal(props) {
    const modal = props.modal;
    const setInitState = props.setInitState;

    const [title, setTitle] = React.useState('');
    const [contents, setContents] = React.useState('');

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const contentsHandler = (event) => {
        setContents(event.target.value);
    }

    const confirmHandler = (event) => {
        const newItem = {
            title,
            contents
        }

        if (title === '' && contents === '') {
            return null;
        }

        items.createItem(newItem);
        setInitState();
    }

    const cancleHandler = (event) => {
        modal.setIsModal(false);
    }

    return (
        <dialog open className="qna-modal">
            <input type="text" value={title} onChange={titleHandler} placeholder="제목을 입력하세요." />
            <textarea onChange={contentsHandler} placeholder="내용을 입력하세요." defaultValue={contents}></textarea>
            <div>
                <button className="qna-board-button" onClick={confirmHandler}>등록하기</button>
                <button className="qna-board-button" onClick={cancleHandler}>취소하기</button>
            </div>
        </dialog>
    )
}

function BoardItem(props) {
    const listItem = props.listItem;

    return (
        <div className="qna-board-item">
            <div>
                <span>{listItem.item.title}</span>
                <span className="qna-item-date">{listItem.createdDate}</span>
            </div>
            <div className="qna-item-answer">
                <span>답변</span>
                <span>7</span>
            </div>
        </div>
    )
}

export default ConnectorApp;