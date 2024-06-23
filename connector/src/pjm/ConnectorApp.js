import React from "react";
import QnaStorage from "./model/QnaStorage";
import styles from './css/connector-app.css';

const items = new QnaStorage();

function ConnectorApp(props) {
    let qnaList = window.localStorage.getItem('qnaList');

    if (!qnaList) {
        qnaList = []
    } else {
        qnaList = JSON.parse(qnaList);
    }

    return (
        <div className="container">
            <QnA qnaList={qnaList} />
        </div >
    )
}

function QnA(props) {
    const [list, setList] = React.useState(props.qnaList);
    const [selected, setSelected] = React.useState('All');

    items.setList(list);

    const listState = {
        list,
        setList
    }

    const selectedState = {
        selected,
        setSelected
    }

    const tagArray = ['JavaScript', 'HTML', 'CSS', 'React'];
    return (
        <div className="qna-area">
            <div className="qna-tag-title">
                <span className="logo">Connector</span>
                <span className="board-title">개발자 Q&A 게시판</span>
            </div>
            <div className="qna-tag-list">
                <Tag tagName="All" selectedState={selectedState} />
                {
                    tagArray.map((tag, index) => {
                        return <Tag tagName={tag} key={index} selectedState={selectedState} />
                    })
                }
            </div>
            <BoardArea listState={listState} />
        </div>
    )
}

function Tag(props) {
    const [selected, setSelected] = [props.selectedState.selected, props.selectedState.setSelected];

    const clickHandler = (tagName) => {
        setSelected(tagName);
    }

    return (
        <div className={`qna-tag-element${props.tagName === selected ? " selected" : ""}`} onClick={() => { clickHandler(props.tagName); }}>
            <span>{props.tagName}</span>
        </div>
    )
}

function BoardArea(props) {
    // props를 통해 전달받은 데이터
    const [list, setList] = [props.listState.list, props.listState.setList];

    // 새로 정의되는 state
    const [isModal, setIsModal] = React.useState(false);
    const [isNew, setIsNew] = React.useState(0);

    const setInitState = () => {
        setIsModal(false);
        setIsNew(isNew + 1);
        setList(items.list);
    }

    React.useEffect(() => {
        window.localStorage.setItem('qnaList', JSON.stringify(list));
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
                    return <BoardItem key={index} index={index} listItem={listItem} modal={modal} />
                })
            }
        </div>
    )
}

function BoardModal(props) {
    // props를 통해 전달받은 데이터
    const modal = props.modal;
    const setInitState = props.setInitState;

    const currentItem = items.getItem();

    // 글쓰기 작성 시 나타나는 입력 컴포넌트에 연결된 states
    const [title, setTitle] = React.useState(currentItem ? currentItem.data.title : '');
    const [contents, setContents] = React.useState(currentItem ? currentItem.data.contents : '');

    // 포커스 효과를 주기 위해 선언한 레퍼런스
    const titleRef = React.useRef(null);

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
            items.updateQuestion(newItem);
        } else {
            items.createQuestion(newItem);
        }
        setInitState();
    }

    const cancleHandler = () => {
        modal.setIsModal(false);
        items.setIndexDefault();
    }

    React.useEffect(() => {
        titleRef.current.focus();
    }, []);

    return (
        <dialog open className="qna-modal">
            <input type="text" value={title} ref={titleRef} onChange={titleHandler} placeholder="제목을 입력하세요." />
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
                <span>{listItem.answerList.length}</span>
            </div>
        </div>
    )
}

export default ConnectorApp;