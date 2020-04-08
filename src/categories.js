// Taken from @tobinus's python-podgen https://github.com/tobinus/python-podgen/blob/develop/podgen/category.py, 
// which is also used int the backend for Radio Revolt's podcast system

export const ItunesCategories = {
    'Arts': [
        'Books',
        'Design',
        'Fashion & Beauty',
        'Food',
        'Performing Arts',
        'Visual Arts',
    ],
    'Business': [
        'Careers',
        'Entrepreneurship',
        'Investing',
        'Management',
        'Marketing',
        'Non-Profit',
    ],
    'Comedy': [
        'Comedy Interviews',
        'Improv',
        'Stand-up',
    ],
    'Education': [
        'Courses',
        'How To',
        'Language Learning',
        'Self-Improvement',
    ],
    'Fiction': [
        'Comedy Fiction',
        'Drama',
        'Science Fiction',
    ],
    'Government': [],
    'History': [],
    'Health & Fitness': [
        'Alternative Health',
        'Fitness',
        'Medicine',
        'Mental Health',
        'Nutrition',
        'Sexuality',
    ],
    'Kids & Family': [
        'Education for Kids',
        'Parenting',
        'Pets & Animals',
        'Stories for Kids',
    ],
    'Leisure': [
        'Animation & Manga',
        'Automotive',
        'Aviation',
        'Crafts',
        'Games',
        'Hobbies',
        'Home & Garden',
        'Video Games',
    ],
    'Music': [
        'Music Commentary',
        'Music History',
        'Music Interviews',
    ],
    'News': [
        'Business News',
        'Daily News',
        'Entertainment News',
        'News Commentary',
        'Politics',
        'Sports News',
        'Tech News',
    ],
    'Religion & Spirituality': [
        'Buddhism',
        'Christianity',
        'Hinduism',
        'Islam',
        'Judaism',
        'Religion',
        'Spirituality',
    ],
    'Science': [
        'Astronomy',
        'Chemistry',
        'Earth Sciences',
        'Life Sciences',
        'Mathematics',
        'Natural Sciences',
        'Nature',
        'Physics',
        'Social Sciences',
    ],
    'Society & Culture': [
        'Documentary',
        'Personal Journals',
        'Philosophy',
        'Places & Travel',
        'Relationships',
    ],
    'Sports': [
        'Baseball',
        'Basketball',
        'Cricket',
        'Fantasy Sports',
        'Football',
        'Golf',
        'Hockey',
        'Rugby',
        'Running',
        'Soccer',
        'Swimming',
        'Tennis',
        'Volleyball',
        'Wilderness',
        'Wrestling',
    ],
    'Technology': [],
    'True Crime': [],
    'TV & Film': [
        'After Shows',
        'Film History',
        'Film Interviews',
        'Film Reviews',
        'TV Reviews',
    ],
}

export function getFlattenedCategories() {
    const flattenedCategories = [];
    for (const category in ItunesCategories) {
        flattenedCategories.push(category)
        if (ItunesCategories[category]) {
            // Add subcategories
            flattenedCategories.push(...ItunesCategories[category])
        }
    }
    return flattenedCategories
}