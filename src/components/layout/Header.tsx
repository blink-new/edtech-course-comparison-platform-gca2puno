import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, User, Bell, Globe, BookOpen, Target, MessageCircle, Calendar, Info } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'

export function Header() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              E
            </div>
            <span className="text-xl font-bold text-gray-900">EduCompare</span>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
          </div>

          {/* Navigation Menu - Hidden on mobile */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <NavigationMenuLink asChild>
                      <div 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/ai-finder')}
                      >
                        <Target className="h-4 w-4 mb-2 text-blue-600" />
                        <div className="text-sm font-medium leading-none">AI Course Finder</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get personalized course recommendations
                        </p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <div 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/diagnostic-assessment')}
                      >
                        <BookOpen className="h-4 w-4 mb-2 text-green-600" />
                        <div className="text-sm font-medium leading-none">Diagnostic Assessment</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Test your knowledge and get recommendations
                        </p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <div 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/study-planner')}
                      >
                        <Calendar className="h-4 w-4 mb-2 text-purple-600" />
                        <div className="text-sm font-medium leading-none">Study Planner</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Plan and track your study schedule
                        </p>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <div 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/community')}
                      >
                        <MessageCircle className="h-4 w-4 mb-2 text-orange-600" />
                        <div className="text-sm font-medium leading-none">Community Forums</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Connect with fellow students
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 cursor-pointer"
                  onClick={() => navigate('/exam-info')}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Exam Info
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search courses, exams, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Globe className="h-4 w-4 mr-1" />
                  EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी</DropdownMenuItem>
                <DropdownMenuItem>বাংলা</DropdownMenuItem>
                <DropdownMenuItem>தমিழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/ai-finder')}>AI Course Finder</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/diagnostic-assessment')}>Take Assessment</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/study-planner')}>Study Planner</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/community')}>Community</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/exam-info')}>Exam Info</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/search')}>
                  <Search className="h-4 w-4 mr-2" />
                  Search Courses
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/ai-finder')}>
                  <Target className="h-4 w-4 mr-2" />
                  AI Course Finder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/diagnostic-assessment')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take Assessment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/study-planner')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Study Planner
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/community')}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Community
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/exam-info')}>
                  <Info className="h-4 w-4 mr-2" />
                  Exam Info
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}