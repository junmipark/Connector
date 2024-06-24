import Item from "./Item";

/**
 * [ QuestionItem ]
 * QnA에서 질문 게시글 작성 시 생성되는 아이템
 * 데이터 구조 (2023. 6. 24 기준)
 * data { title, contents, tags }
 * createdDate
 * modifiedDate
 * answerCount - 누적 답변 등록 수 (질문의 고유한 id값을 만들기 위해 사용)
 * answerList - 질문에 대한 답변 목록
 */

class QuestionItem extends Item {
    constructor(data) {
        super(data);
        this.answerCount = 0;
        this.answerList = [];
    }
}

export default QuestionItem;