import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MessageCircle, Plus, Search, Filter, TrendingUp, 
  Clock, Users, ThumbsUp, MessageSquare, Pin,
  Award, Star, Eye, ArrowUp, ArrowDown, Reply,
  Flag, Share2, Bookmark, MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Textarea } from '../components/ui/textarea'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { blink } from '../blink/client'

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    reputation: number
    badges: string[]
  }
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  upvotes: number
  downvotes: number
  replies: number
  views: number
  isPinned: boolean
  isSolved: boolean
  isLocked: boolean
}

interface ForumReply {
  id: string
  postId: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
    reputation: number
    badges: string[]
  }
  createdAt: string
  upvotes: number
  downvotes: number
  isAccepted: boolean
  parentReplyId?: string
}

const mockPosts: ForumPost[] = [
  {
    id: 'post_1',
    title: 'Best strategy for JEE Mathematics preparation in final 3 months?',
    content: 'I have been preparing for JEE for the past year but still struggling with advanced mathematics topics like coordinate geometry and calculus. With only 3 months left, what should be my strategy? Should I focus on previous year questions or continue with theory?',
    author: {
      id: 'user_1',
      name: 'Rahul Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      reputation: 245,
      badges: ['JEE Aspirant', 'Active Member']
    },
    category: 'JEE',
    tags: ['Mathematics', 'Strategy', 'Last Minute'],
    createdAt: '2024-01-18T10:30:00Z',
    updatedAt: '2024-01-18T10:30:00Z',
    upvotes: 24,
    downvotes: 2,
    replies: 15,
    views: 342,
    isPinned: false,
    isSolved: true,
    isLocked: false
  },
  {
    id: 'post_2',
    title: 'UPSC Current Affairs - Best sources for 2024?',
    content: 'Looking for reliable sources for current affairs preparation for UPSC 2024. Currently reading The Hindu but finding it overwhelming. Any suggestions for concise yet comprehensive sources?',
    author: {
      id: 'user_2',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      reputation: 567,
      badges: ['UPSC Aspirant', 'Top Contributor', 'Verified']
    },
    category: 'UPSC',
    tags: ['Current Affairs', 'Resources', 'Study Material'],
    createdAt: '2024-01-17T15:45:00Z',
    updatedAt: '2024-01-18T09:20:00Z',
    upvotes: 45,
    downvotes: 1,
    replies: 28,
    views: 789,
    isPinned: true,
    isSolved: false,
    isLocked: false
  },
  {
    id: 'post_3',
    title: 'NEET Biology - Difficulty level increasing every year?',
    content: 'Has anyone noticed that NEET Biology questions are getting more conceptual and tricky each year? The 2023 paper had some really challenging questions. How should we adapt our preparation strategy?',
    author: {
      id: 'user_3',
      name: 'Anita Singh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      reputation: 189,
      badges: ['NEET Aspirant']
    },
    category: 'NEET',
    tags: ['Biology', 'Difficulty', 'Trends'],
    createdAt: '2024-01-16T12:15:00Z',
    updatedAt: '2024-01-16T12:15:00Z',
    upvotes: 18,
    downvotes: 3,
    replies: 12,
    views: 256,
    isPinned: false,
    isSolved: false,
    isLocked: false
  },
  {
    id: 'post_4',
    title: 'Study Group for GMAT Preparation - Delhi NCR',
    content: 'Looking to form a study group for GMAT preparation in Delhi NCR. Planning to take the exam in March 2024. Anyone interested in joining? We can meet on weekends and discuss strategies, share resources.',
    author: {
      id: 'user_4',
      name: 'Vikash Gupta',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      reputation: 123,
      badges: ['GMAT Aspirant', 'Study Group Leader']
    },
    category: 'GMAT',
    tags: ['Study Group', 'Delhi', 'Collaboration'],
    createdAt: '2024-01-15T18:00:00Z',
    updatedAt: '2024-01-17T14:30:00Z',
    upvotes: 12,
    downvotes: 0,
    replies: 8,
    views: 145,
    isPinned: false,
    isSolved: false,
    isLocked: false
  }
]

const mockReplies: ForumReply[] = [
  {
    id: 'reply_1',
    postId: 'post_1',
    content: 'Focus on previous year questions for the last 3 months. Theory revision should be quick. Make sure to practice at least 2-3 hours of math daily and identify your weak topics first.',
    author: {
      id: 'user_5',
      name: 'Dr. Amit Verma',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      reputation: 1245,
      badges: ['Expert', 'JEE Mentor', 'Top Contributor']
    },
    createdAt: '2024-01-18T11:15:00Z',
    upvotes: 18,
    downvotes: 1,
    isAccepted: true
  },
  {
    id: 'reply_2',
    postId: 'post_1',
    content: 'I would also recommend solving mock tests regularly. Time management is crucial in JEE. Also, don\'t neglect Physics and Chemistry while focusing on Math.',
    author: {
      id: 'user_6',
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      reputation: 456,
      badges: ['JEE Cleared 2023', 'IIT Student']
    },
    createdAt: '2024-01-18T12:30:00Z',
    upvotes: 12,
    downvotes: 0,
    isAccepted: false
  }
]

export function CommunityForums() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [replies, setReplies] = useState<ForumReply[]>(mockReplies)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState('JEE')
  const [newReplyContent, setNewReplyContent] = useState('')

  const categories = ['all', 'JEE', 'UPSC', 'NEET', 'GMAT', 'SSC', 'K12', 'General']

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await blink.auth.me()
        setUser(userData)
      } catch (error) {
        console.error('Failed to load user:', error)
      }
    }
    loadUser()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      case 'replies':
        return b.replies - a.replies
      case 'views':
        return b.views - a.views
      default: // recent
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: user?.id || 'anonymous',
        name: user?.displayName || user?.email || 'Anonymous',
        avatar: user?.avatar,
        reputation: 0,
        badges: ['New Member']
      },
      category: newPostCategory,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      views: 0,
      isPinned: false,
      isSolved: false,
      isLocked: false
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPostForm(false)
  }

  const handleCreateReply = () => {
    if (!newReplyContent.trim() || !selectedPost) return

    const newReply: ForumReply = {
      id: `reply_${Date.now()}`,
      postId: selectedPost.id,
      content: newReplyContent,
      author: {
        id: user?.id || 'anonymous',
        name: user?.displayName || user?.email || 'Anonymous',
        avatar: user?.avatar,
        reputation: 0,
        badges: ['New Member']
      },
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      isAccepted: false
    }

    setReplies([...replies, newReply])
    setNewReplyContent('')
    
    // Update post reply count
    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, replies: post.replies + 1 }
        : post
    ))
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: type === 'up' ? post.upvotes + 1 : post.upvotes,
          downvotes: type === 'down' ? post.downvotes + 1 : post.downvotes
        }
      }
      return post
    }))
  }

  if (selectedPost) {
    const postReplies = replies.filter(reply => reply.postId === selectedPost.id)
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setSelectedPost(null)}>
                ← Back to Forums
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedPost.category}</Badge>
                {selectedPost.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                {selectedPost.isSolved && <Badge className="bg-green-600">Solved</Badge>}
              </div>
            </div>

            {/* Post */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Vote buttons */}
                  <div className="flex flex-col items-center space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVote(selectedPost.id, 'up')}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold text-gray-900">
                      {selectedPost.upvotes - selectedPost.downvotes}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleVote(selectedPost.id, 'down')}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      {selectedPost.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={selectedPost.author.avatar} />
                          <AvatarFallback>{selectedPost.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{selectedPost.author.name}</span>
                        <span className="text-blue-600">({selectedPost.author.reputation} rep)</span>
                      </div>
                      <span>•</span>
                      <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedPost.views}
                      </div>
                    </div>

                    <div className="prose max-w-none mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      {selectedPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Replies */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {postReplies.length} Replies
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {postReplies.map((reply, index) => (
                  <div key={reply.id}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center space-y-2">
                          <Button variant="ghost" size="sm">
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <span className="text-sm font-medium">
                            {reply.upvotes - reply.downvotes}
                          </span>
                          <Button variant="ghost" size="sm">
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{reply.author.name}</span>
                                {reply.author.badges.map((badge, badgeIndex) => (
                                  <Badge key={badgeIndex} variant="outline" className="text-xs">
                                    {badge}
                                  </Badge>
                                ))}
                                {reply.isAccepted && (
                                  <Badge className="bg-green-600 text-xs">
                                    <Award className="w-3 h-3 mr-1" />
                                    Accepted Answer
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                {reply.author.reputation} reputation • {formatTimeAgo(reply.createdAt)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="prose max-w-none mb-3">
                            <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Reply className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < postReplies.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reply Form */}
            <Card>
              <CardHeader>
                <CardTitle>Your Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write your answer here..."
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleCreateReply}
                      disabled={!newReplyContent.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Post Answer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forums</h1>
              <p className="text-gray-600">
                Connect with fellow students, ask questions, and share knowledge
              </p>
            </div>
            <Button 
              onClick={() => setShowNewPostForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="replies">Most Replies</option>
                    <option value="views">Most Views</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  <TabsTrigger value="solved">Solved</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {sortedPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedPost(post)}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {/* Stats */}
                          <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[60px]">
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">
                                {post.upvotes - post.downvotes}
                              </div>
                              <div>votes</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{post.replies}</div>
                              <div>replies</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{post.views}</div>
                              <div>views</div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {post.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                  {post.title}
                                </h3>
                                {post.isSolved && <Badge className="bg-green-600">Solved</Badge>}
                              </div>
                            </div>

                            <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{post.category}</Badge>
                                {post.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{post.tags.length - 2}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{post.author.name}</span>
                                </div>
                                <span>•</span>
                                <span>{formatTimeAgo(post.updatedAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="trending">
                  <div className="space-y-4">
                    {sortedPosts
                      .filter(post => post.upvotes > 10)
                      .map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedPost(post)}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-orange-600" />
                              <Badge className="bg-orange-600">Trending</Badge>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <span>{post.upvotes} upvotes</span>
                                <span>{post.replies} replies</span>
                                <span>{post.views} views</span>
                              </div>
                              <span>{formatTimeAgo(post.updatedAt)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="unanswered">
                  <div className="space-y-4">
                    {sortedPosts
                      .filter(post => post.replies === 0)
                      .map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedPost(post)}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle className="w-4 h-4 text-red-600" />
                              <Badge variant="destructive">Needs Answer</Badge>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <span>{post.upvotes} upvotes</span>
                                <span>{post.views} views</span>
                              </div>
                              <span>{formatTimeAgo(post.createdAt)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="solved">
                  <div className="space-y-4">
                    {sortedPosts
                      .filter(post => post.isSolved)
                      .map((post) => (
                        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => setSelectedPost(post)}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-4 h-4 text-green-600" />
                              <Badge className="bg-green-600">Solved</Badge>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <span>{post.upvotes} upvotes</span>
                                <span>{post.replies} replies</span>
                                <span>{post.views} views</span>
                              </div>
                              <span>{formatTimeAgo(post.updatedAt)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Dr. Amit Verma', reputation: 1245, badge: 'Expert' },
                      { name: 'Priya Sharma', reputation: 567, badge: 'Top Contributor' },
                      { name: 'Sneha Patel', reputation: 456, badge: 'IIT Student' }
                    ].map((contributor, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{contributor.name}</div>
                          <div className="text-sm text-gray-600">
                            {contributor.reputation} rep • {contributor.badge}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Mathematics', 'Physics', 'Chemistry', 'Current Affairs', 'Strategy', 'Mock Tests', 'Study Tips', 'Resources'].map((tag, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Forum Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Forum Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Posts</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-semibold">456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solved Questions</span>
                      <span className="font-semibold">789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expert Contributors</span>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* New Post Modal */}
          {showNewPostForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.filter(cat => cat !== 'all').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        placeholder="What's your question or topic?"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <Textarea
                        placeholder="Describe your question in detail..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewPostForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPostTitle.trim() || !newPostContent.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Create Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}