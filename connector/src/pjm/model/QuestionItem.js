import Item from "./Item";

/**
 * [ QuestionItem ]
 * QnA에서 질문 게시글 작성 시 생성되는 아이템
 * 데이터 구조 (2023. 6. 23 기준)
 * data { title, contents }
 * createdDate
 * modifiedDate
 */

class QuestionItem extends Item {
    constructor(data) {
        super(data);
        this.answerCount = 0;
        this.answerList = [];
    }

    addAnswerItem(answerItem) {
        if (answerItem) {
            answerItem = { ...answerItem, id: this.answerCount++ };
            this.answerList.push(answerItem);
            return true;
        } return false;
    }

    removeAnswerItem(answerIndex) {
        if (answerIndex > -1 && answerIndex < this.answerList.length) {
            const [removedAnswer] = this.answerList.splice(answerIndex, 1);
            return removedAnswer;
        } return null;
    }

    getAnswerItem(answerIndex) {
        if (answerIndex > -1 && answerIndex < this.answerList.length) {
            return this.answerList[answerIndex];
        }
        return null;
    }
}

export default QuestionItem;