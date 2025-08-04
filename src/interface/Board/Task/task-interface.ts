export interface taskProps {
    id: string,
    value: string,
    isPublic: boolean,
    comments: CommentUserProps[]
}

interface CommentUserProps{
    author: string,
    comment: string
}