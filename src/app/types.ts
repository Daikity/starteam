export type Story = {
    id: number,
    by: string,
    title: string,
    text: string
    url: string,
    type: "job" | "story" | "comment" | "poll" | "pollopt",
    descendants: number,
    kids: number[],
    parts: number[]
    deleted: boolean
    dead: boolean
    score: number,
    time: number,
    poll: number
    parent: number
}


export type CommentApi = {
  by: string,
  id: number,
  kids: number[]
  parent: number
  text: string
  time: number
  type: string
}

export type Comment = {
  id: number
  by: string
  comment: string
  child: Comment[]
  time: number
};
