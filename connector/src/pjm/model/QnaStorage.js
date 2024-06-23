import ItemStorage from "./ItemStorage";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";

class QnaStorage extends ItemStorage {
    constructor() {
        super();
    }

    createQuestion(data) {
        const question = new QuestionItem({ ...data, 'id': this.count++ });
        this.list.push(question);
    }

    updateQuestion(data) {
        if (this.currentIndex !== -1) {
            let newQuestion = new QuestionItem(data);
            newQuestion = { ...newQuestion, createdDate: this.list[this.currentIndex].createdDate }
            this.list[this.currentIndex] = newQuestion;
        }
    }

    deleteQuestion() {
        if (this.currentIndex !== -1) {
            this.list.splice(this.currentIndex, 1);
            this.currentIndex = -1;
            return true;
        } return false;
    }

    createAnswer(data) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            const questionId = currentQuestion.id;
            const newAnswer = new AnswerItem(data, questionId);
            currentQuestion.answerList.push(newAnswer);
            this.list[this.currentIndex] = currentQuestion;
        }
    }

    updateAnswer(data, answerIndex) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            const newAnswer = currentQuestion.answerList[answerIndex];
            newAnswer.data = data;
            currentQuestion.answerList[answerIndex] = newAnswer;
            return true;
        } return false;
    }

    deleteAnswer(answerIndex) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            currentQuestion.answerList.splice(answerIndex, 1);
            return true;
        } return false;
    }
}

export default QnaStorage;