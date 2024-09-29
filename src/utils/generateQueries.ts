const generateQueries = (keywords: string[]) => {
    const baseQueries = [
        `${keywords.join(' ')} information`,
        // `${keywords.join(' ')} guide`,
        // `${keywords.join(' ')} tips`,
        // `${keywords.join(' ')} deals`,
    ];
    return baseQueries;
};

export default generateQueries;