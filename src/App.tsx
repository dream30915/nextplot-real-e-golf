import React, { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  MagnifyingGlass as Search, 
  Funnel as Filter, 
  ShareNetwork as Share, 
  Heart, 
  MapPin, 
  Phone, 
  Envelope as Mail, 
  ChatCircle as MessageCircle,
  Copy,
  Globe,
  User,
  Eye,
  EyeSlash as EyeOff,
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  X
} from '@phosphor-icons/react'

// Translations
const translations = {
  th: {
    // Header & Navigation
    'nav.home': 'หน้าหลัก',
    'nav.properties': 'ที่ดิน',
    'nav.contact': 'ติดต่อ',
    'nav.login': 'เข้าสู่ระบบ',
    'nav.language': 'ภาษา',
    'nav.landsmaps': 'LandsMaps',
    
    // Hero Section
    'hero.title': 'บริการซื้อ‑ขาย‑เช่า และ ขายฝาก รับจัดหาที่ดินตามความต้องการทั่วราชอาณาจักร',
    'hero.description': 'บ้าน อาคารพาณิช ที่ดิน โกดัง โรงงาน พร้อมฟีเจอร์แชร์ง่ายหลายช่องทาง ปลอดภัย เข้าถึงได้ ฟอร์มลูกค้า (PDPA) และระบบขอเอกสารแบบ Soft Gate',
    'hero.cta.viewAll': 'ดูที่ดินทั้งหมด',
    'hero.cta.contact': 'ติดต่อเรา',
    
    // Search & Filter
    'search.placeholder': 'ค้นหาที่ดิน...',
    'filter.location': 'ทำเล',
    'filter.priceMin': 'ราคาต่ำสุด',
    'filter.priceMax': 'ราคาสูงสุด',
    'filter.areaMin': 'พื้นที่ต่ำสุด',
    'filter.areaMax': 'พื้นที่สูงสุด',
    'filter.status': 'สถานะ',
    'filter.sort': 'เรียงตาม',
    'filter.apply': 'ค้นหา',
    'filter.clear': 'ล้างตัวกรอง',
    
    // Property Status
    'status.available': 'ว่าง',
    'status.reserved': 'จอง',
    'status.sold': 'ขายแล้ว',
    
    // Sort Options
    'sort.latest': 'ล่าสุด',
    'sort.priceAsc': 'ราคาต่ำ - สูง',
    'sort.priceDesc': 'ราคาสูง - ต่ำ',
    
    // Property Details
    'property.price': 'ราคา',
    'property.area': 'พื้นที่',
    'property.status': 'สถานะ',
    'property.zoning': 'สีผัง',
    'property.code': 'รหัส',
    'property.tags': 'แท็ก',
    'property.viewDetails': 'ดูรายละเอียด',
    'property.share': 'แชร์',
    'property.favorite': 'บันทึกไว้',
    'property.contact': 'ติดต่อสอบถาม',
    
    // Area Units
    'area.rai': 'ไร่',
    'area.ngan': 'งาน',
    'area.wah': 'ตร.วา',
    'area.sqm': 'ตร.ม.',
    'area.tooltip': '1 ไร่ = 4 งาน = 400 ตร.วา; 1 ตร.วา = 4 ตร.ม.',
    
    // Share Platforms
    'share.line': 'แชร์ไปที่ Line',
    'share.facebook': 'แชร์ไปที่ Facebook',
    'share.email': 'แชร์ทางอีเมล',
    'share.wechat': 'แชร์ไปที่ WeChat',
    'share.copy': 'คัดลอกลิงก์',
    'share.copied': 'คัดลอกแล้ว!',
    'share.wechatInstructions': 'เปิดใน WeChat แล้ววางลิงก์',
    
    // Contact Form
    'form.name': 'ชื่อ-นามสกุล',
    'form.name.placeholder': 'กรุณากรอกชื่อ-นามสกุล',
    'form.phone': 'เบอร์โทรศัพท์',
    'form.phone.placeholder': 'เช่น 081-234-5678',
    'form.email': 'อีเมล',
    'form.email.placeholder': 'example@email.com',
    'form.preferredChannel': 'ช่องทางติดต่อที่ต้องการ',
    'form.message': 'ข้อความ',
    'form.message.placeholder': 'แจ้งความต้องการ...',
    'form.pdpaConsent': 'ข้าพเจ้ายินยอมให้ติดต่อกลับและยินยอมตามนโยบายความเป็นส่วนตัว',
    'form.submit': 'ส่งข้อมูล',
    'form.submitting': 'กำลังส่ง...',
    'form.success': 'ส่งข้อมูลเรียบร้อยแล้ว',
    'form.error': 'เกิดข้อผิดพลาด กรุณาลองใหม่',
    
    // Contact Channels
    'channel.line': 'Line',
    'channel.facebook': 'Facebook',
    'channel.email': 'อีเมล',
    'channel.wechat': 'WeChat',
    'channel.phone': 'โทรศัพท์',
    
    // Footer
    'footer.copyright': '© 2024 NextPlot. สงวนลิขสิทธิ์',
    'footer.privacy': 'นโยบายความเป็นส่วนตัว',
    'footer.terms': 'เงื่อนไขการใช้งาน',
    
    // Currency
    'currency.thb': 'บาท'
  },
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.language': 'Language',
    'nav.landsmaps': 'LandsMaps',
    
    // Hero Section
    'hero.title': 'Buy, Sell, Rent & Property Investment Services Nationwide',
    'hero.description': 'Houses, Commercial Buildings, Land, Warehouses, Factories with easy multi-channel sharing features, secure, accessible, customer forms (PDPA) and Soft Gate document system',
    'hero.cta.viewAll': 'View All Properties',
    'hero.cta.contact': 'Contact Us',
    
    // Search & Filter
    'search.placeholder': 'Search properties...',
    'filter.location': 'Location',
    'filter.priceMin': 'Min Price',
    'filter.priceMax': 'Max Price',
    'filter.areaMin': 'Min Area',
    'filter.areaMax': 'Max Area',
    'filter.status': 'Status',
    'filter.sort': 'Sort by',
    'filter.apply': 'Search',
    'filter.clear': 'Clear Filters',
    
    // Property Status
    'status.available': 'Available',
    'status.reserved': 'Reserved',
    'status.sold': 'Sold',
    
    // Sort Options
    'sort.latest': 'Latest',
    'sort.priceAsc': 'Price: Low - High',
    'sort.priceDesc': 'Price: High - Low',
    
    // Property Details
    'property.price': 'Price',
    'property.area': 'Area',
    'property.status': 'Status',
    'property.zoning': 'Zoning',
    'property.code': 'Code',
    'property.tags': 'Tags',
    'property.viewDetails': 'View Details',
    'property.share': 'Share',
    'property.favorite': 'Save',
    'property.contact': 'Contact',
    
    // Area Units
    'area.rai': 'Rai',
    'area.ngan': 'Ngan',
    'area.wah': 'Sq.Wah',
    'area.sqm': 'Sq.M',
    'area.tooltip': '1 Rai = 4 Ngan = 400 Sq.Wah; 1 Sq.Wah = 4 Sq.M',
    
    // Share Platforms
    'share.line': 'Share to Line',
    'share.facebook': 'Share to Facebook',
    'share.email': 'Share via Email',
    'share.wechat': 'Share to WeChat',
    'share.copy': 'Copy Link',
    'share.copied': 'Copied!',
    'share.wechatInstructions': 'Open in WeChat and paste link',
    
    // Contact Form
    'form.name': 'Full Name',
    'form.name.placeholder': 'Enter your full name',
    'form.phone': 'Phone Number',
    'form.phone.placeholder': 'e.g. 081-234-5678',
    'form.email': 'Email',
    'form.email.placeholder': 'example@email.com',
    'form.preferredChannel': 'Preferred Contact Method',
    'form.message': 'Message',
    'form.message.placeholder': 'Your requirements...',
    'form.pdpaConsent': 'I consent to be contacted and agree to the privacy policy',
    'form.submit': 'Submit',
    'form.submitting': 'Submitting...',
    'form.success': 'Information sent successfully',
    'form.error': 'An error occurred. Please try again',
    
    // Contact Channels
    'channel.line': 'Line',
    'channel.facebook': 'Facebook',
    'channel.email': 'Email',
    'channel.wechat': 'WeChat',
    'channel.phone': 'Phone',
    
    // Footer
    'footer.copyright': '© 2024 NextPlot. All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Currency
    'currency.thb': 'THB'
  },
  zh: {
    // Header & Navigation
    'nav.home': '首页',
    'nav.properties': '房产',
    'nav.contact': '联系我们',
    'nav.login': '登录',
    'nav.language': '语言',
    'nav.landsmaps': 'LandsMaps',
    
    // Hero Section
    'hero.title': '全国房地产买卖租赁及投资服务',
    'hero.description': '住宅、商业建筑、土地、仓库、工厂，具有易于使用的多渠道分享功能，安全可靠，客户表单（PDPA）和软门文档系统',
    'hero.cta.viewAll': '查看所有房产',
    'hero.cta.contact': '联系我们',
    
    // Search & Filter
    'search.placeholder': '搜索房产...',
    'filter.location': '位置',
    'filter.priceMin': '最低价格',
    'filter.priceMax': '最高价格',
    'filter.areaMin': '最小面积',
    'filter.areaMax': '最大面积',
    'filter.status': '状态',
    'filter.sort': '排序',
    'filter.apply': '搜索',
    'filter.clear': '清除筛选',
    
    // Property Status
    'status.available': '可售',
    'status.reserved': '预订',
    'status.sold': '已售',
    
    // Sort Options
    'sort.latest': '最新',
    'sort.priceAsc': '价格：低到高',
    'sort.priceDesc': '价格：高到低',
    
    // Property Details
    'property.price': '价格',
    'property.area': '面积',
    'property.status': '状态',
    'property.zoning': '区划',
    'property.code': '编号',
    'property.tags': '标签',
    'property.viewDetails': '查看详情',
    'property.share': '分享',
    'property.favorite': '收藏',
    'property.contact': '联系',
    
    // Area Units
    'area.rai': '莱',
    'area.ngan': '岸',
    'area.wah': '平方哇',
    'area.sqm': '平方米',
    'area.tooltip': '1莱 = 4岸 = 400平方哇；1平方哇 = 4平方米',
    
    // Share Platforms
    'share.line': '分享到Line',
    'share.facebook': '分享到Facebook',
    'share.email': '通过邮件分享',
    'share.wechat': '分享到微信',
    'share.copy': '复制链接',
    'share.copied': '已复制！',
    'share.wechatInstructions': '在微信中打开并粘贴链接',
    
    // Contact Form
    'form.name': '姓名',
    'form.name.placeholder': '请输入您的姓名',
    'form.phone': '电话号码',
    'form.phone.placeholder': '例如：081-234-5678',
    'form.email': '邮箱',
    'form.email.placeholder': 'example@email.com',
    'form.preferredChannel': '首选联系方式',
    'form.message': '留言',
    'form.message.placeholder': '您的需求...',
    'form.pdpaConsent': '我同意被联系并同意隐私政策',
    'form.submit': '提交',
    'form.submitting': '提交中...',
    'form.success': '信息发送成功',
    'form.error': '发生错误，请重试',
    
    // Contact Channels
    'channel.line': 'Line',
    'channel.facebook': 'Facebook',
    'channel.email': '邮箱',
    'channel.wechat': '微信',
    'channel.phone': '电话',
    
    // Footer
    'footer.copyright': '© 2024 NextPlot. 版权所有',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    
    // Currency
    'currency.thb': '泰铢'
  }
}

// Property data type
interface Property {
  id: string
  code: string
  title: string
  location: string
  price: number
  currency: string
  area: {
    value: number
    unit: 'rai' | 'sqm'
  }
  status: 'available' | 'reserved' | 'sold'
  tags: string[]
  isSensitive: boolean
  media: Array<{
    type: 'image' | 'video'
    src: string
    alt?: string
    poster?: string
    isSensitive?: boolean
  }>
  zoning?: {
    name: string
    colorHex: string
    note?: string
  }
}

// Filter state type
interface FilterState {
  keyword: string
  location: string
  priceMin: string
  priceMax: string
  areaMin: string
  areaMax: string
  status: string
  sort: string
}

// Lead form type
interface LeadForm {
  name: string
  phone: string
  email: string
  preferredChannel: string
  message: string
  pdpaConsent: boolean
  propertyId: string
}

function App() {
  // Language state
  const [currentLang, setCurrentLang] = useKV('language', 'th')
  
  // Property state
  const [properties] = useKV<Property[]>('properties', [])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showPropertyModal, setShowPropertyModal] = useState(false)
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: '',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    status: '',
    sort: 'latest'
  })
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState<LeadForm>({
    name: '',
    phone: '',
    email: '',
    preferredChannel: '',
    message: '',
    pdpaConsent: false,
    propertyId: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Favorites state
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  
  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareProperty, setShareProperty] = useState<Property | null>(null)
  
  // Gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Translation helper
  const t = (key: string): string => {
    return translations[currentLang as keyof typeof translations]?.[key as keyof typeof translations['th']] || key
  }
  
  // Change language and update HTML lang attribute
  const changeLanguage = (lang: string) => {
    setCurrentLang(lang)
    document.documentElement.lang = lang
  }
  
  // Format area display
  const formatArea = (area: Property['area']) => {
    if (area.unit === 'rai') {
      const totalSquareWah = area.value * 400
      const rai = Math.floor(area.value)
      const remainingWah = totalSquareWah - (rai * 400)
      const ngan = Math.floor(remainingWah / 100)
      const wah = remainingWah % 100
      const sqm = totalSquareWah * 4
      
      let display = ''
      if (rai > 0) display += `${rai} ${t('area.rai')} `
      if (ngan > 0) display += `${ngan} ${t('area.ngan')} `
      if (wah > 0) display += `${wah} ${t('area.wah')} `
      display += `(${sqm.toLocaleString()} ${t('area.sqm')})`
      
      return display.trim()
    } else {
      return `${area.value.toLocaleString()} ${t('area.sqm')}`
    }
  }
  
  // Format price
  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency === 'THB' ? t('currency.thb') : currency}`
  }
  
  // Filter properties
  useEffect(() => {
    let filtered = [...(properties || [])]
    
    // Keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(keyword) ||
        p.location.toLowerCase().includes(keyword) ||
        p.code.toLowerCase().includes(keyword) ||
        p.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }
    
    // Location filter
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    // Price filters
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceMax))
    }
    
    // Area filters
    if (filters.areaMin) {
      const minArea = parseFloat(filters.areaMin)
      filtered = filtered.filter(p => {
        const areaInRai = p.area.unit === 'rai' ? p.area.value : p.area.value / 1600
        return areaInRai >= minArea
      })
    }
    if (filters.areaMax) {
      const maxArea = parseFloat(filters.areaMax)
      filtered = filtered.filter(p => {
        const areaInRai = p.area.unit === 'rai' ? p.area.value : p.area.value / 1600
        return areaInRai <= maxArea
      })
    }
    
    // Status filter
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status)
    }
    
    // Sort
    switch (filters.sort) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price)
        break
      default: // latest
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
    }
    
    setFilteredProperties(filtered)
  }, [properties, filters])
  
  // Toggle favorite
  const toggleFavorite = (propertyId: string) => {
    setFavorites(current => {
      const currentFavorites = current || []
      return currentFavorites.includes(propertyId)
        ? currentFavorites.filter(id => id !== propertyId)
        : [...currentFavorites, propertyId]
    })
  }
  
  // Generate share URL with UTM
  const generateShareURL = (property: Property, channel: string) => {
    const baseUrl = window.location.origin
    const url = `${baseUrl}?property=${property.id}&utm_source=${channel}&utm_medium=share&utm_campaign=property&utm_content=${property.id}`
    return url
  }
  
  // Handle share
  const handleShare = async (property: Property, channel: string) => {
    const shareUrl = generateShareURL(property, channel)
    const shareText = `${property.title} - ${property.location} - ${formatPrice(property.price, property.currency)}`
    
    // Log share event
    console.log('Share event:', { property: property.id, channel, url: shareUrl })
    
    switch (channel) {
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: property.title,
              text: shareText,
              url: shareUrl
            })
            return
          } catch (err) {
            console.log('Native share cancelled')
          }
        }
        break
        
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')
        break
        
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener')
        break
        
      case 'email':
        const subject = encodeURIComponent(property.title)
        const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`)
        window.open(`mailto:?subject=${subject}&body=${body}`)
        break
        
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareUrl)
          toast.success(t('share.copied'))
        } catch (err) {
          console.error('Copy failed:', err)
        }
        break
        
      case 'wechat':
        // For WeChat, we'll show QR code and copy button
        await navigator.clipboard.writeText(shareUrl)
        toast.success(t('share.copied') + ' - ' + t('share.wechatInstructions'))
        break
    }
  }
  
  // Open property modal
  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
    setShowPropertyModal(true)
  }
  
  // Open contact form
  const openContactForm = (property?: Property) => {
    setContactForm(prev => ({
      ...prev,
      propertyId: property?.id || '',
      message: property ? `สนใจ ${property.title} รหัส ${property.code}` : ''
    }))
    setShowContactForm(true)
  }
  
  // Submit contact form
  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Validate required fields
      if (!contactForm.name || !contactForm.phone || !contactForm.pdpaConsent) {
        throw new Error('Please fill required fields and accept PDPA consent')
      }
      
      // Mock submission - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Lead submitted:', contactForm)
      
      toast.success(t('form.success'))
      setShowContactForm(false)
      setContactForm({
        name: '',
        phone: '',
        email: '',
        preferredChannel: '',
        message: '',
        pdpaConsent: false,
        propertyId: ''
      })
    } catch (error) {
      toast.error(t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default'
      case 'reserved': return 'secondary'
      case 'sold': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        ข้ามไปเนื้อหาหลัก
      </a>

      {/* Header */}
      <header className="border-b border-border bg-card" role="banner">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Globe size={24} className="text-accent-foreground" />
            </div>
            <div>
              <div className="text-xl font-bold text-accent">NextPlot</div>
              <div className="text-xs text-accent">PLOT FOR SALE</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <a href="#" className="hover:text-accent transition-colors">{t('nav.home')}</a>
            <a href="#properties" className="hover:text-accent transition-colors">{t('nav.properties')}</a>
            <a href="#contact" className="hover:text-accent transition-colors">{t('nav.contact')}</a>
            <a 
              href="https://landsmaps.dol.go.th/" 
              target="_blank" 
              rel="noopener"
              className="hover:text-accent transition-colors"
            >
              {t('nav.landsmaps')}
            </a>
          </nav>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Select value={currentLang} onValueChange={changeLanguage}>
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="th">TH</SelectItem>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="zh">ZH</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              {t('nav.login')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {t('hero.cta.viewAll')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => openContactForm()}>
              {t('hero.cta.contact')}
            </Button>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section id="properties" className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder={t('search.placeholder')}
                  value={filters.keyword}
                  onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Location */}
            <div>
              <Input
                placeholder={t('filter.location')}
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            {/* Price Range */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder={t('filter.priceMin')}
                type="number"
                value={filters.priceMin}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
              />
              <Input
                placeholder={t('filter.priceMax')}
                type="number"
                value={filters.priceMax}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
              />
            </div>
            
            {/* Status */}
            <div>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('filter.status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">{t('status.available')}</SelectItem>
                  <SelectItem value="reserved">{t('status.reserved')}</SelectItem>
                  <SelectItem value="sold">{t('status.sold')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort */}
            <div>
              <Select value={filters.sort} onValueChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">{t('sort.latest')}</SelectItem>
                  <SelectItem value="priceAsc">{t('sort.priceAsc')}</SelectItem>
                  <SelectItem value="priceDesc">{t('sort.priceDesc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filter Actions */}
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={() => setFilters({
                keyword: '',
                location: '',
                priceMin: '',
                priceMax: '',
                areaMin: '',
                areaMax: '',
                status: '',
                sort: 'latest'
              })}
              variant="outline"
              size="sm"
            >
              {t('filter.clear')}
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <main id="main-content" className="py-8" role="main">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  {property.media[0] && (
                    <img
                      src={property.media[0].src}
                      alt={property.media[0].alt || property.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Status Badge */}
                  <Badge 
                    variant={getStatusVariant(property.status)}
                    className="absolute top-2 left-2"
                  >
                    {t(`status.${property.status}`)}
                  </Badge>
                  
                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(property.id)
                    }}
                    aria-label={t('property.favorite')}
                  >
                    <Heart 
                      size={16} 
                      weight={(favorites || []).includes(property.id) ? 'fill' : 'regular'}
                      className={(favorites || []).includes(property.id) ? 'text-red-500' : 'text-foreground'}
                    />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xl font-bold text-accent">
                      {formatPrice(property.price, property.currency)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatArea(property.area)}
                    </div>
                    
                    {/* Zoning */}
                    {property.zoning && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: property.zoning.colorHex }}
                          aria-label={`${t('property.zoning')}: ${property.zoning.name}`}
                        />
                        <span className="text-sm">{property.zoning.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {property.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {property.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => openPropertyModal(property)}
                    >
                      {t('property.viewDetails')}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShareProperty(property)
                        setShowShareModal(true)
                      }}
                      aria-label={t('property.share')}
                    >
                      <Share size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg">ไม่พบที่ดินที่ตรงกับเงื่อนไขการค้นหา</div>
            </div>
          )}
        </div>
      </main>

      {/* Property Detail Modal */}
      <Dialog open={showPropertyModal} onOpenChange={setShowPropertyModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProperty.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Gallery */}
                <div className="space-y-4">
                  {selectedProperty.media.length > 0 && (
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={selectedProperty.media[currentImageIndex]?.src}
                        alt={selectedProperty.media[currentImageIndex]?.alt || selectedProperty.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {selectedProperty.media.length > 1 && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === 0 ? selectedProperty.media.length - 1 : prev - 1
                            )}
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === selectedProperty.media.length - 1 ? 0 : prev + 1
                            )}
                            aria-label="Next image"
                          >
                            <ChevronRight size={16} />
                          </Button>
                          
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 px-2 py-1 rounded text-sm">
                            {currentImageIndex + 1} / {selectedProperty.media.length}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Thumbnail strip */}
                  {selectedProperty.media.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {selectedProperty.media.map((media, index) => (
                        <button
                          key={index}
                          className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                            index === currentImageIndex ? 'border-accent' : 'border-border'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={media.src}
                            alt={media.alt || `${selectedProperty.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Property Info */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">{t('property.code')}</div>
                      <div className="font-mono text-lg">{selectedProperty.code}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">{t('property.price')}</div>
                      <div className="text-3xl font-bold text-accent">
                        {formatPrice(selectedProperty.price, selectedProperty.currency)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">{t('property.area')}</div>
                      <div className="text-lg" title={t('area.tooltip')}>
                        {formatArea(selectedProperty.area)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin size={16} />
                      <span>{selectedProperty.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(selectedProperty.status)}>
                        {t(`status.${selectedProperty.status}`)}
                      </Badge>
                    </div>
                    
                    {/* Zoning */}
                    {selectedProperty.zoning && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">{t('property.zoning')}</div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: selectedProperty.zoning.colorHex }}
                            aria-label={`${t('property.zoning')}: ${selectedProperty.zoning.name}`}
                          />
                          <span>{selectedProperty.zoning.name}</span>
                          {selectedProperty.zoning.note && (
                            <span className="text-sm text-muted-foreground">({selectedProperty.zoning.note})</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {selectedProperty.tags.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">{t('property.tags')}</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => {
                        setShowPropertyModal(false)
                        openContactForm(selectedProperty)
                      }}
                    >
                      <Phone size={20} className="mr-2" />
                      {t('property.contact')}
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setShareProperty(selectedProperty)
                          setShowShareModal(true)
                        }}
                      >
                        <Share size={16} className="mr-2" />
                        {t('property.share')}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(selectedProperty.id)}
                        className={(favorites || []).includes(selectedProperty.id) ? 'bg-red-50 text-red-600 border-red-200' : ''}
                      >
                        <Heart 
                          size={16} 
                          weight={(favorites || []).includes(selectedProperty.id) ? 'fill' : 'regular'}
                        />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('https://landsmaps.dol.go.th/', '_blank', 'noopener')}
                      >
                        <MapPin size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('property.share')}</DialogTitle>
          </DialogHeader>
          
          {shareProperty && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {shareProperty.title} - {shareProperty.location}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Try native share first on mobile */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <Button
                    variant="outline"
                    onClick={() => handleShare(shareProperty, 'native')}
                    className="flex items-center gap-2"
                  >
                    <Share size={16} />
                    Share
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(shareProperty, 'line')}
                  className="flex items-center gap-2"
                  aria-label={t('share.line')}
                >
                  <MessageCircle size={16} />
                  Line
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(shareProperty, 'facebook')}
                  className="flex items-center gap-2"
                  aria-label={t('share.facebook')}
                >
                  <Globe size={16} />
                  Facebook
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(shareProperty, 'email')}
                  className="flex items-center gap-2"
                  aria-label={t('share.email')}
                >
                  <Mail size={16} />
                  Email
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(shareProperty, 'wechat')}
                  className="flex items-center gap-2"
                  aria-label={t('share.wechat')}
                >
                  <MessageCircle size={16} />
                  WeChat
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(shareProperty, 'copy')}
                  className="flex items-center gap-2"
                  aria-label={t('share.copy')}
                >
                  <Copy size={16} />
                  {t('share.copy')}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Form Modal */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('nav.contact')}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={submitContactForm} className="space-y-4">
            {/* Honeypot field (hidden anti-spam) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
              onChange={(e) => {
                // If this field is filled, it's likely a bot
                if (e.target.value) {
                  console.log('Honeypot triggered')
                  return
                }
              }}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">{t('form.name')} *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('form.name.placeholder')}
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">{t('form.phone')} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('form.phone.placeholder')}
                  pattern="[0-9-]+"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">{t('form.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('form.email.placeholder')}
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="channel">{t('form.preferredChannel')}</Label>
                <Select 
                  value={contactForm.preferredChannel} 
                  onValueChange={(value) => setContactForm(prev => ({ ...prev, preferredChannel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.preferredChannel')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">{t('channel.line')}</SelectItem>
                    <SelectItem value="facebook">{t('channel.facebook')}</SelectItem>
                    <SelectItem value="email">{t('channel.email')}</SelectItem>
                    <SelectItem value="wechat">{t('channel.wechat')}</SelectItem>
                    <SelectItem value="phone">{t('channel.phone')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">{t('form.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('form.message.placeholder')}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="pdpa"
                  checked={contactForm.pdpaConsent}
                  onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, pdpaConsent: !!checked }))}
                  required
                />
                <Label htmlFor="pdpa" className="text-sm leading-relaxed">
                  {t('form.pdpaConsent')}
                </Label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isSubmitting || !contactForm.pdpaConsent}
            >
              {isSubmitting ? t('form.submitting') : t('form.submit')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-16" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <div className="text-lg font-bold text-accent">NextPlot</div>
                  <div className="text-xs text-accent">PLOT FOR SALE</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('hero.description')}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">เมนู</h3>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t('nav.home')}
                </a>
                <a href="#properties" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t('nav.properties')}
                </a>
                <a href="#contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t('nav.contact')}
                </a>
                <a 
                  href="https://landsmaps.dol.go.th/" 
                  target="_blank" 
                  rel="noopener"
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {t('nav.landsmaps')}
                </a>
              </div>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">นโยบาย</h3>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t('footer.privacy')}
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                  {t('footer.terms')}
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App