// Base 
export const BASE_API = "https://skillsora.funnydev.id.vn/api/v1";

// Authentication
export const AUTH_CLERK_API = "/auth/clerk";
export const AUTH_SIGNIN = "/auth/sign_in"
export const AUTH_SIGNUP = "/auth/sign_up"

// User
export const GET_USERS_API = "/users";
export const GET_USER_API = (userId: string) => `/users/${userId}`;
export const GET_USER_CLERK_PROFILE_API = "/users/clerk/profile";
export const POST_USERS_API = "/users";
export const PUT_USER_API = "/users";
export const PUT_USER_PROFILE_API = "/users/clerk/profile";
export const GET_USER_LEVEL_API = (appUserId: string) => `/users/${appUserId}/level`;
export const GET_USER_TOPIC_API = (appUserId: string) => `/users/${appUserId}/topics`;
export const GET_USER_SUBTOPIC_API = (appUserId: string) => `/users/${appUserId}/sub-topics`;

// UserSubcription
export const GET_USER_SUBSCRIPTIONS = `user-subscriptions`;
export const GET_USER_SUBSCRIPTION = (id: string) => `user-subscriptions/${id}`;

// Topic
export const GET_TOPICS_API = "/my-topics";
export const GET_TOPIC_API = (topicId: string) => `/my-topics/${topicId}`;
export const POST_TOPIC_API = "/topics";
export const POST_MY_TOPIC_API = "/my-topics";
export const PUT_TOPIC_API = "/my-topics";
export const DELETE_TOPIC_API = (topicId: string) => `/my-topics/${topicId}`;

// SubTopic
export const GET_SUBTOPICS_API = (topicId: string) => `/sub-topics/topic/${topicId}`;
export const GET_SUBTOPIC_API = (subTopicId: string) => `/sub-topics/${subTopicId}`;
export const POST_SUBTOPIC_API = "/sub-topics";
export const PUT_SUBTOPIC_API = "/sub-topics";
export const POST_COMPLETION_SUBTOPIC_API = (subTopicId: string) => `/sub-topics/${subTopicId}/completion`;

// ExerciseType
export const GET_EXERCISETYPES_API = "/exercise-types";
export const GET_EXERCISETYPE_API = (typeId: string) => `/exercise-types/${typeId}`;
export const POST_EXERCISETYPE_API = "/exercise-types";
export const PUT_EXERCISETYPE_API = "/exercise-types";

// Exercise
export const GET_EXERCISES_API = (subTopicId: string) => `/my-exercises/sub-topic/${subTopicId}`;
export const GET_EXERCISE_API = (exerciseId: string) => `/my-exercises/${exerciseId}`;
export const POST_EXERCISE_API = "/my-exercises";
export const POST_EXERCISE_OPTIONS_API = (exerciseId: string) => `/my-exercises/${exerciseId}/options`;
export const POST_ATTEMPT_EXCERCISE_API = (exerciseId: string) => `/my-exercises/${exerciseId}/attempt`;
export const PUT_EXERCISE = "/my-exercises";
export const PUT_EXERCISE_OPTIONS_API = (exerciseId: string) => `/my-exercises/${exerciseId}/options`;
export const DELETE_EXERCISE = (exerciseId: string) => `/my-exercises/${exerciseId}`;
export const DELETE_BULK_EXERCISE = "/my-exercises/bulk";

// Learning Package
export const GET_LEARNING_PACKAGES_API = "/learning-packages";
export const GET_LEARNING_PACKAGE_API = (packageId: string) => `/learning-packages/${packageId}`;
export const POST_LEARNING_PACKAGES_API = "/learning-packages";
export const PUT_LEARNING_PACKAGES_API = (packageId: string) => `/learning-packages/${packageId}`;
export const PATCH_LEARNING_PACKAGES_API = (packageId: string) => `/learning-packages/${packageId}`;

// Payment
export const POST_PAYMENT_CHECKOUT_API = "/payments/checkout"
export const PUT_PAYMENT_UPDATE_API = "/payments/complete"


