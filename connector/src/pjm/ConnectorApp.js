import React from "react";
import ItemStorage from "./ItemStorage";

import styles from './css/connector-app.css';

/**
 * item의 구성
 * id, title, contents, ...
 */


const items = new ItemStorage();

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
    const tagArray = ['JavaScript', 'HTML', 'CSS', 'React'];
    return (
        <div className="qna-area">
            <div className="qna-tag-title">
                <span className="logo">Connector</span>
                <span className="board-title">개발자 Q&A 게시판</span>
            </div>
            <div className="qna-tag-list">
                <Tag tagName="All" selected="selected" />
                {
                    tagArray.map((tag, index) => {
                        return <Tag tagName={tag} key={index} />
                    })
                }
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

    const writeHandler = () => {
        setIsModal(true);
    }

    return (
        <div className="qna-board-list">
            <button className="qna-board-button" onClick={writeHandler}>글쓰기</button>
            {isModal ? <BoardModal modal={modal} setInitState={setInitState} /> : null}

            {
                items.list.map((listItem, index) => {
                    return <BoardItem key={index} index={index} listItem={listItem} setInitState={setInitState} modal={modal} />
                })
            }
        </div>
    )
}

function BoardModal(props) {
    const modal = props.modal;
    const setInitState = props.setInitState;

    const currentItem = items.getItem();

    const [title, setTitle] = React.useState(currentItem ? currentItem.data.title : '');
    const [contents, setContents] = React.useState(currentItem ? currentItem.data.contents : '');

    // 포커스 효과를 주기 위해 선언한 레퍼런스
    const inputRef = React.useRef(null);

    const titleHandler = (event) => {
        setTitle(event.target.value);
    }

    const contentsHandler = (event) => {
        setContents(event.target.value);
    }

    const confirmHandler = () => {
        const newItem = {
            title,
            contents
        }

        if (title === '' || contents === '') {
            return null;
        }

        if (currentItem) {
            items.updateItem(newItem);
        } else {
            items.createItem(newItem);
        }
        setInitState();
    }

    const cancleHandler = () => {
        modal.setIsModal(false);
    }

    React.useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <dialog open className="qna-modal">
            <input type="text" value={title} ref={inputRef} onChange={titleHandler} placeholder="제목을 입력하세요." />
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

    const clickHandler = (index) => {
        items.setCurrentIndex(index);
        props.modal.setIsModal(true);
    }

    return (
        <div className="qna-board-item" onClick={() => { clickHandler(props.index) }}>
            <div>
                <span>{listItem.data.title}</span>
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