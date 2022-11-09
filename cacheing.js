export const cacheAllUsers = {
    usersWithSubstrs: {},

    async cache(func, substr){
        if(this.usersWithSubstrs[substr]){
            return this.usersWithSubstrs[substr]
        }

        const res = await func(substr)
        this.usersWithSubstrs[substr] = res
        return res
    },

    clearCache(){
        this.usersWithSubstrs = {}
    }
}

export const cacheUser = {
    users: {},

    async cache(func, id){
        if(this.users[id]){
            return this.users[id]
        }

        const res = await func(id)
        this.users[id] = res
        return res
    },

    clearCache(){
        this.users = {}
    }
}

export const cacheAllPosts = {
    allPosts: {},

    async cache(func, query){
        const stringQuery = JSON.stringify(query)
        if(this.allPosts[stringQuery]){
            return this.allPosts[stringQuery]
        }

        const res = await func(query)
        this.allPosts[stringQuery] = res
        return res
    },

    clearCache(){
        this.allPosts = {}
    }
}

export const cachePost = {
    posts: {},

    async cache(func, id){
        if(this.posts[id]){
            return this.posts[id]
        }

        const res = await func(id)
        this.posts[id] = res
        return res
    },

    clearCache(){
        this.posts = {}
    }
}

export const cacheLocation = {
    locations: {},

    async cache(func, query){
        const stringQuery = JSON.stringify(query)
        if(this.locations[stringQuery]){
            return this.locations[stringQuery]
        }

        const res = await func(query)
        this.locations[stringQuery] = res
        return res
    },

    clearCache(){
        this.locations = {}
    }
}

export function clearAllCache(){
    cacheAllUsers.clearCache()
    cacheUser.clearCache()
    cacheAllPosts.clearCache()
    cachePost.clearCache()
    cacheLocation.clearCache()
    console.log('cache cleared')
}