export type PostImage = {
    imageId: string;
    postId: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
}

export type Post = {
    postId: string;
    createdAt: string;
    text: string;
    userId: string;
    username: string;
    images: PostImage[];
}

export type User = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    permissions: number[];
    sanctionFlag: boolean;
}

export type File = {
    id: number;
    userId: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
  }


  export type UserFile = {
    id: string;
    userId: string;
    fileName: string;
    fileUrl: string;
    createdAt: string;
  }
  