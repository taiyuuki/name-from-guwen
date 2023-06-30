const useInstance = <T extends abstract new (...args: any[]) => Component>() => {
    return ref() as Ref<T>
}

export {
    useInstance,
}
