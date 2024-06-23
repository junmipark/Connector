import React from "react";
import QnaStorage from "./model/QnaStorage";
import styles from './css/connector-app.css';

const items = new QnaStorage();

function ConnectorApp(props) {
    let qnaList = window.localStorage.getItem('qnaList');
    const lastIndex = window.localStorage.getItem('lastIndex');

    if (!qnaList) {
        qnaList = []
    } else {
        qnaList = JSON.parse(qnaList);
    }

    return (
        <div className="container">
            <QnA qnaList={qnaList} lastIndex={lastIndex} />
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
            <BoardArea listState={listState} lastIndex={props.lastIndex} />
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
    const [showBoardModal, setShowBoardModal] = React.useState(false);
    const [detailsIndex, setDetailsIndex] = React.useState(props.lastIndex ? props.lastIndex : -1);
    const [isNew, setIsNew] = React.useState(0);

    const setInitState = () => {
        setShowBoardModal(false);
        setList(items.list);
        setIsNew(isNew + 1);
    }

    React.useEffect(() => {
        window.localStorage.setItem('qnaList', JSON.stringify(list));
        window.localStorage.setItem('lastIndex', detailsIndex);
    }, [isNew, list, detailsIndex]);

    const modalStates = {
        showBoardModal: showBoardModal,
        setShowBoardModal: setShowBoardModal
    };

    const detailsStates = {
        detailsIndex,
        setDetailsIndex
    }

    const writeHandler = () => {
        items.setIndexDefault();
        setShowBoardModal(true);
    }

    return (
        <div className="qna-board-list">
            <button className="qna-board-button" onClick={writeHandler}>글쓰기</button>
            {showBoardModal ? <BoardModal modalStates={modalStates} setInitState={setInitState} /> : null}
            {
                items.list.map((listItem, index) => {
                    return <BoardItem key={index} index={index} listItem={listItem}
                        modalStates={modalStates} detailsStates={detailsStates} setInitState={setInitState} />
                })
            }
        </div>
    )
}

function BoardModal(props) {
    // props를 통해 전달받은 데이터
    const modalStates = props.modalStates;
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

        let result;
        if (currentItem) {
            result = items.updateQuestion(newItem) ? '게시글이 수정되었습니다.' : '게시글이 수정되지 않았습니다.';
        } else {
            result = items.createQuestion(newItem) ? '게시글이 등록되었습니다.' : '게시글이 등록되지 않았습니다.';
        }
        alert(result);
        setInitState();
    }

    const cancleHandler = () => {
        modalStates.setShowBoardModal(false);
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
    const [detailsIndex, setDetailsIndex] = [props.detailsStates.detailsIndex, props.detailsStates.setDetailsIndex];
    const [showItem, setShowItem] = React.useState(false);

    const modalStates = {
        ...props.modalStates,
        showItem,
        setShowItem
    }

    const clickHandler = (index) => {
        if (index !== detailsIndex) {
            items.setCurrentIndex(index);
            setDetailsIndex(index);
            setShowItem(true);
        } else {
            return null;
        }
    }

    return (
        <>
            <div className={`qna-board-item item-title ${detailsIndex === props.index ? 'clicked' : ''}`} onClick={() => { clickHandler(props.index) }}>
                <div>
                    <span>{listItem.data.title}</span>
                    <span className="qna-item-date">{listItem.createdDate}</span>
                </div>
                <div className="qna-item-answer">
                    <span>답변</span>
                    <span>{listItem.answerList.length}</span>
                </div>
            </div>
            {showItem && detailsIndex === props.index && <BoardItemDetails index={props.index} listItem={listItem}
                modalStates={modalStates} detailsStates={props.detailsStates} setInitState={props.setInitState} />}
        </>
    )
}

function BoardItemDetails(props) {
    const listItem = props.listItem;

    const [contents, setContents] = React.useState('');
    const textareaRef = React.useRef(null);

    const changeHandler = (event) => {
        setContents(event.target.value);
    }

    const clickHandler = (event) => {
        const result = items.createAnswer({ contents });
        if (result) {
            alert('답변이 등록되었습니다.');
        } else {
            alert('답변이 등록되지 않았습니다.');
            return null;
        }
        textareaRef.current.value = '';
        setContents('');
        props.setInitState();
    }

    return (
        <div className="qna-board-item item-details">
            <QuestionItem listItem={listItem} index={props.index} modalStates={props.modalStates} detailsStates={props.detailsStates} setInitState={props.setInitState} />
            <div className="qna-answer-textarea">
                <span className="answer-title">답변 등록하기</span>
                <textarea ref={textareaRef} value={contents} onChange={changeHandler}
                    placeholder={listItem.answerList.length === 0 ? '첫 답변을 등록해보세요!' : '답변을 등록해보세요!'}></textarea>
                <div className="question-buttons">
                    <button className="qna-board-button" onClick={clickHandler}>등록하기</button>
                </div>
            </div>
            {
                listItem.answerList.map((answerItem, index) => {
                    return (
                        <AnswerItem answerItem={answerItem} questionIndex={props.index} index={index} key={index} setInitState={props.setInitState} />
                    )
                })
            }
        </div>
    )
}

function QuestionItem(props) {
    const listItem = props.listItem;
    const modalStates = props.modalStates;

    const modifyHandler = (index) => {
        items.setCurrentIndex(index);
        modalStates.setShowBoardModal(true);
    }

    const deleteHandler = (index) => {
        items.setCurrentIndex(index);
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            const result = items.deleteQuestion() ? '게시글이 삭제되었습니다.' : '게시글이 삭제되지 않았습니다.';
            window.alert(result);
        } else {
            items.setIndexDefault();
        }
        props.setInitState();
    }

    return (
        <>
            <div className="qna-question">
                <div className="question-title">
                    <span>{listItem.data.title}</span>
                </div>
                <div className="question-dates">
                    <span className="qna-item-date question-date-data">작성일: {listItem.createdDate}</span>
                    {listItem.createdDate !== listItem.modifiedDate && <span className="qna-item-date question-date-data">(최종 수정일: {listItem.modifiedDate})</span>}
                </div>
                <div className="question-contents">
                    <pre>{listItem.data.contents}</pre>
                </div>
                <div className="question-tags">
                    <button className="question-tag">JavaScript</button>
                    <button className="question-tag">React</button>
                    <button className="question-tag">CSS</button>
                </div>
            </div>
            <div className="qna-item-question question-option">
                <div className="question-buttons">
                    <button className="qna-board-button" onClick={() => { modifyHandler(props.index) }}>수정하기</button>
                    <button className="qna-board-button" onClick={() => { deleteHandler(props.index) }}>삭제하기</button>
                </div>
            </div>

        </>
    )
}

function AnswerItem(props) {
    const answerItem = props.answerItem;
    const [createdDate, modifiedDate] = [answerItem.createdDate, answerItem.modifiedDate];

    const [showTextarea, setShowTextarea] = React.useState(false);
    const [contents, setContents] = React.useState(answerItem.data.contents);

    const textareaRef = React.useRef(null);

    React.useEffect(() => {
        if (showTextarea) {
            textareaRef.current.focus();
        }
    }, [showTextarea, textareaRef]);

    const changeHandler = (event) => {
        setContents(event.target.value);
    }

    const clickHandler = (event) => {
        setShowTextarea(true);
    }

    const modifyHandler = (answerIndex) => {
        items.setCurrentIndex(props.questionIndex);
        const result = items.updateAnswer({ contents }, answerIndex) ? '답변이 수정되었습니다.' : '답변이 수정되지 않았습니다.';
        window.alert(result);
        textareaRef.current.value = '';
        props.setInitState();
    }

    const deleteHandler = (answerIndex) => {
        items.setCurrentIndex(props.questionIndex);
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            const result = items.deleteAnswer(answerIndex) ? '답변이 삭제되었습니다.' : '답변이 삭제되지 않았습니다.';
            window.alert(result);
            props.setInitState();
        } else {
            items.setIndexDefault();
        }
    }

    return (
        <div className="qna-answer">
            <div className="qna-item-answer">
                <span>{props.index + 1}</span>
            </div>
            <div className="qna-answer-area">
                <div className="question-contents answer-contents">
                    {showTextarea ? <textarea ref={textareaRef} onChange={changeHandler} value={contents}></textarea> : <pre>{contents}</pre>}
                </div>
                <div className="question-dates">
                    <span className="question-date-data">작성일: {createdDate}</span>
                    {createdDate !== modifiedDate && <span className="question-date-data">최종 수정일: {modifiedDate}</span>}
                </div>
                <div className="question-buttons">
                    <button className="qna-board-button" onClick={() => {
                        if (showTextarea) modifyHandler(props.index);
                        else clickHandler();
                    }}>{showTextarea ? '수정하기' : '답변 수정하기'}</button>
                    <button className="qna-board-button" onClick={() => {
                        if (showTextarea) setShowTextarea(false);
                        else deleteHandler(props.index);
                    }}>{showTextarea ? '취소하기' : '답변 삭제하기'}</button>
                </div>
            </div>
        </div>
    )
}

export default ConnectorApp;