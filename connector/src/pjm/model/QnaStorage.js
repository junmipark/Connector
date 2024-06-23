import ItemStorage from "./ItemStorage";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";

class QnaStorage extends ItemStorage {
    constructor() {
        super();
    }

    createQuestion(data) {
        const question = new QuestionItem({ ...data, 'id': this.count++ });
        try {
            this.list.push(question);
        } catch {
            return false;
        }
        return true;
    }

    updateQuestion(data) {
        try {
            if (this.currentIndex !== -1) {
                let newQuestion = new QuestionItem(data);
                newQuestion = { ...newQuestion, createdDate: this.list[this.currentIndex].createdDate }
                this.list[this.currentIndex] = newQuestion;
            }
        } catch {
            return false
        } return true;
    }

    deleteQuestion() {
        try {
            if (this.currentIndex !== -1) {
                this.list.splice(this.currentIndex, 1);
                this.currentIndex = -1;
            }
        } catch {
            return false;
        }
        return true;
    }

    createAnswer(data) {
        try {

            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const questionId = currentQuestion.id;
                const newAnswer = new AnswerItem(data, questionId);
                currentQuestion.answerList.push(newAnswer);
                this.list[this.currentIndex] = currentQuestion;
            }
        } catch {
            return false;
        } return true;
    }

    updateAnswer(data, answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const questionId = currentQuestion.id;
                let newAnswer = new AnswerItem(data, questionId);
                newAnswer = { ...newAnswer, createdDate: currentQuestion.answerList[answerIndex].createdDate };
                currentQuestion.answerList[answerIndex] = newAnswer;
            }
        } catch {
            return false;
        } return true;
    }

    deleteAnswer(answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                currentQuestion.answerList.splice(answerIndex, 1);

            }
        } catch {
            return false;
        } return true;
    }
}

export default QnaStorage;