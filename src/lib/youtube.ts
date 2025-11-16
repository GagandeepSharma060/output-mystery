// YouTube API integration
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  youtubeId: string;
  publishedAt: string;
  description: string;
  viewCount: string;
}

export interface YouTubeChannelInfo {
  channelId: string;
  channelTitle: string;
  subscriberCount: string;
  videoCount: string;
}

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

// Category mapping based on video titles/keywords
const getCategoryFromTitle = (title: string): string => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('react') || titleLower.includes('jsx') || titleLower.includes('hook')) {
    return 'React';
  }
  if (titleLower.includes('javascript') || titleLower.includes('js ') || titleLower.includes('array') || titleLower.includes('function')) {
    return 'JavaScript';
  }
  if (titleLower.includes('python') || titleLower.includes('django') || titleLower.includes('flask')) {
    return 'Python';
  }
  if (titleLower.includes('css') || titleLower.includes('styling') || titleLower.includes('grid') || titleLower.includes('flexbox')) {
    return 'CSS';
  }
  if (titleLower.includes('typescript') || titleLower.includes('ts ')) {
    return 'TypeScript';
  }
  if (titleLower.includes('node') || titleLower.includes('express') || titleLower.includes('backend')) {
    return 'Node.js';
  }
  if (titleLower.includes('html') || titleLower.includes('web')) {
    return 'HTML';
  }
  
  return 'JavaScript'; // Default category
};

// Difficulty mapping based on video titles/keywords
const getDifficultyFromTitle = (title: string): 'Beginner' | 'Intermediate' | 'Advanced' => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('beginner') || titleLower.includes('basic') || titleLower.includes('intro') || titleLower.includes('learn')) {
    return 'Beginner';
  }
  if (titleLower.includes('advanced') || titleLower.includes('expert') || titleLower.includes('complex') || titleLower.includes('master')) {
    return 'Advanced';
  }
  
  return 'Intermediate'; // Default difficulty
};

// Format duration from ISO 8601 to readable format
const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Format view count
const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// Fetch videos from YouTube API
export const fetchYouTubeVideos = async (maxResults: number = 50): Promise<YouTubeVideo[]> => {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube API key or Channel ID not configured');
    return [];
  }

  try {
    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data');
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }

    // Get videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const videosData = await videosResponse.json();
    
    // Get detailed video information including duration
    const videoIds = videosData.items.map((item: { snippet: { resourceId: { videoId: string } } }) => item.snippet.resourceId.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details');
    }
    
    const detailsData = await detailsResponse.json();
    
    // Combine data and format videos
    const videos: YouTubeVideo[] = videosData.items.map((item: { 
      snippet: { 
        title: string; 
        thumbnails: { maxres?: { url: string }; high?: { url: string }; default?: { url: string } }; 
        resourceId: { videoId: string }; 
        publishedAt: string; 
        description: string; 
      } 
    }, index: number) => {
      const details = detailsData.items[index];
      const title = item.snippet.title;
      
      return {
        id: item.snippet.resourceId.videoId,
        title: title,
        thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        category: getCategoryFromTitle(title),
        difficulty: getDifficultyFromTitle(title),
        youtubeId: item.snippet.resourceId.videoId,
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
        viewCount: formatViewCount(details?.statistics?.viewCount || '0')
      };
    });
    
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

// Fetch channel information
export const fetchChannelInfo = async (): Promise<YouTubeChannelInfo | null> => {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch channel info');
    }
    
    const data = await response.json();
    const channel = data.items?.[0];
    
    if (!channel) {
      return null;
    }
    
    return {
      channelId: channel.id,
      channelTitle: channel.snippet.title,
      subscriberCount: formatViewCount(channel.statistics.subscriberCount),
      videoCount: channel.statistics.videoCount
    };
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return null;
  }
};
