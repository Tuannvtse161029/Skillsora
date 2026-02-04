import { IPageRequest } from '../interfaces/general';

export type TopicDto = {
    topicId: string;
    description: string;
    topicName: string;
    totalSubTopic: number;
    createdOn?: Date | null;
    updatedOn?: Date | null;
    thumbnail?: string;
}

export type TopicOfUserDto = TopicDto & {
    lastIncompleteExerciseId: string,
    lastIncompleteSubTopicId: string
}

export type GetPagedTopicsRequest = IPageRequest & {

}

export type UpdateTopicRequest = {
    topicId: string;
    topicName: string;
    topicDescription: string;
    totalSubTopic: number;
};

export type CreateTopicRequest = {
    topicName: string;
    topicDescription: string;
    totalSubTopic: number;
};
