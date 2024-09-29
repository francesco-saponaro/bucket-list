import nlp from 'compromise';

const extractKeywords = (inputText: string) => {
    let doc = nlp(inputText);
    let nouns = doc.nouns().out('array');
    let verbs = doc.verbs().out('array');
    return [...nouns, ...verbs];
};

export default extractKeywords;