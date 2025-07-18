import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'
import { Separator } from '../ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

interface SearchFiltersProps {
  filters: {
    examTypes: string[]
    subjects: string[]
    priceRange: [number, number]
    rating: number
    format: string[]
    level: string[]
    language: string[]
    duration: string[]
  }
  onFiltersChange: (filters: SearchFiltersProps['filters']) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [openSections, setOpenSections] = useState({
    examTypes: true,
    subjects: true,
    price: true,
    rating: true,
    format: true,
    level: true,
    language: false,
    duration: false
  })

  const examTypeOptions = [
    'JEE', 'JEE Main', 'JEE Advanced', 'UPSC', 'Civil Services', 
    'NEET PG', 'Medical', 'SSC', 'SSC CGL', 'SSC CHSL', 
    'GMAT', 'MBA', 'K12', 'CBSE', 'Class 10', 'Class 12'
  ]

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'General Studies', 'Current Affairs', 'History', 'Geography', 'Polity',
    'Quantitative Aptitude', 'General Intelligence', 'General Awareness',
    'Verbal Reasoning', 'Data Insights', 'Medicine', 'Surgery'
  ]

  const formatOptions = ['Online', 'Offline', 'Hybrid']
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced']
  const languageOptions = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu']
  const durationOptions = ['1-3 months', '4-6 months', '7-12 months', '12+ months']

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCheckboxChange = (
    category: keyof Pick<SearchFiltersProps['filters'], 'examTypes' | 'subjects' | 'format' | 'level' | 'language' | 'duration'>,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[category]
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value)
    
    onFiltersChange({
      ...filters,
      [category]: newValues
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    })
  }

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string
    section: keyof typeof openSections
    children: React.ReactNode 
  }) => (
    <Collapsible open={openSections[section]} onOpenChange={() => toggleSection(section)}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium text-gray-900">
          {title}
          {openSections[section] ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )

  const CheckboxGroup = ({ 
    options, 
    category, 
    selectedValues 
  }: { 
    options: string[]
    category: keyof Pick<SearchFiltersProps['filters'], 'examTypes' | 'subjects' | 'format' | 'level' | 'language' | 'duration'>
    selectedValues: string[]
  }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={`${category}-${option}`}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => 
              handleCheckboxChange(category, option, checked as boolean)
            }
          />
          <Label 
            htmlFor={`${category}-${option}`} 
            className="text-sm font-normal cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Exam Types */}
      <FilterSection title="Exam Types" section="examTypes">
        <CheckboxGroup 
          options={examTypeOptions} 
          category="examTypes" 
          selectedValues={filters.examTypes} 
        />
      </FilterSection>

      <Separator />

      {/* Subjects */}
      <FilterSection title="Subjects" section="subjects">
        <CheckboxGroup 
          options={subjectOptions} 
          category="subjects" 
          selectedValues={filters.subjects} 
        />
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={50000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Rating */}
      <FilterSection title="Minimum Rating" section="rating">
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer">
                {rating}+ stars
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Format */}
      <FilterSection title="Format" section="format">
        <CheckboxGroup 
          options={formatOptions} 
          category="format" 
          selectedValues={filters.format} 
        />
      </FilterSection>

      <Separator />

      {/* Level */}
      <FilterSection title="Level" section="level">
        <CheckboxGroup 
          options={levelOptions} 
          category="level" 
          selectedValues={filters.level} 
        />
      </FilterSection>

      <Separator />

      {/* Language */}
      <FilterSection title="Language" section="language">
        <CheckboxGroup 
          options={languageOptions} 
          category="language" 
          selectedValues={filters.language} 
        />
      </FilterSection>

      <Separator />

      {/* Duration */}
      <FilterSection title="Duration" section="duration">
        <CheckboxGroup 
          options={durationOptions} 
          category="duration" 
          selectedValues={filters.duration} 
        />
      </FilterSection>
    </div>
  )
}