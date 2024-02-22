
// const queryClient = useQueryClient();: This line creates an instance of QueryClient, which is used to interact with the queries and mutations in your application.

// const { mutate, isError: isPostError, isPending, error: postError } = useMutation({ ... });: This line initializes a mutation with useMutation. The mutate function is used to trigger the mutation. isError, isPending, and error are states of the mutation that can be used in your component.
// onMutate: This function is called before the mutation function (mutationFn) is invoked. It’s a good place to perform any actions that should happen right before your mutation. For example, you might want to update your UI optimistically (i.e., update the UI as if the mutation will succeed, before actually knowing if it will). The value returned by onMutate is passed as context to the onSuccess, onError, and onSettled callbacks, which can be useful for rolling back optimistic updates if the mutation fails.


// onSuccess: This function is called after a successful mutation. It’s a good place to perform any actions that should happen after a successful mutation, like showing a success message, invalidating/refetching queries, or transitioning to another screen. The onSuccess callback receives three arguments:
// data: The data returned by the mutation function.
// variables: The variables passed to the mutate function.
// context: The value returned by onMutate.
