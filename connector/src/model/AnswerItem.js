import Item from "./Item";

/**
 * [ AnswerItem ]
 * QnA에서 질문에 대한 답변 게시글 작성 시 생성되는 아이템
 * 데이터 구조 (2023. 6. 23 기준)
 * data { contents } - 게시글 제목을 필요로 하지 않음(ref: stackOverflow)
 * createdDate
 * modifiedDate
 * questId - 질문 게시글에 종속되므로 질문 게시글에 대한 정보를 추가
 */

class AnswerItem extends Item {
    constructor(data, questionId) {
        super(data);
        this.questionId = questionId;
    }
}

export default AnswerItem;