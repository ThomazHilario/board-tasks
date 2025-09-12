export interface taskProps {
    id: string,
    value: string,
    author:string,
    isPublic: boolean,
    comments: CommentUserProps[]
}

interface CommentUserProps{
    author: string,
    comment: string
}