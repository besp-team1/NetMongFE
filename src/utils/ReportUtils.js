export const reportTypeToKorean = (type) => {
    switch (type) {
        case 'ABUSE': return '욕설';
        case 'OBSCENITY': return '음란';
        case 'DEFAMATION': return '비방';
        case 'SPAM': return '스팸 홍보/도배';
        case 'ILLEGAL_INFO': return '불법 정보';
        case 'HARMFUL_TO_TEENS': return '청소년 유해';
        default: return type;
    }
};
