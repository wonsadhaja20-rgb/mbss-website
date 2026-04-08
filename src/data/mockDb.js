// This acts as a simulated backend for the MBSS website
// In a real application, this would be a database (PostgreSQL/MongoDB) or Headless CMS

export const articles = [
  {
    id: '1',
    title: 'The Role of Meditation in Modern Education',
    author: 'Ven. Ashin Kumara',
    date: '2023-10-12',
    category: 'Buddhism',
    excerpt: 'Exploring how traditional Buddhist vipassana meditation techniques can enhance focus and academic performance in university students.',
    content: 'Meditation is often misunderstood as a practice solely for monastics. However, in the modern academic setting, the tools provided by traditional Buddhist meditation are invaluable. \n\nAt Mahachulalongkornrajavidyalaya University, students have been integrating Vipassana (insight meditation) into their daily routines. Studies show that merely 15 minutes of anapanasati (mindfulness of breathing) can significantly reduce stress and improve cognitive function before exams.\n\nMBSS encourages all members to join our weekly meditation sessions to experience these benefits firsthand.'
  },
  {
    id: '2',
    title: 'Preserving Mon Culture in the 21st Century',
    author: 'MBSS Committee',
    date: '2023-09-28',
    category: 'Culture',
    excerpt: 'A look at our recent cultural exhibition and the importance of traditional practices in a globalized world.',
    content: 'The Mon people have a rich cultural legacy that dates back millennia. As students studying abroad, it is often challenging to maintain our cultural identity.\n\nOur recent cultural exhibition highlighted traditional Mon attire, literature, and culinary arts. We believe that preservation does not mean isolation; rather, it is about sharing our unique heritage with the broader international Buddhist community.\n\nWe thank all the attendees and volunteers who made the event a resounding success.'
  }
];

export const events = [
  {
    id: '1',
    title: 'Annual Dhamma Talk & Meditation',
    date: '2023-11-15T09:00:00',
    location: 'Main Hall, MCU Campus',
    description: 'Join us for a morning of profound Dhamma teachings led by Ven. Dr. Ashin Kumara, followed by a guided Vipassana meditation session.'
  },
  {
    id: '2',
    title: 'Mon Cultural Exhibition',
    date: '2023-12-03T10:00:00',
    location: 'Student Center',
    description: 'Experience the beauty of Mon culture through traditional dance, music, attire, and food. Open to all university students and staff.'
  }
];

export const researchPapers = [
  {
    id: '1',
    title: 'The Impact of Theravada Buddhism on Mon Social Structures',
    author: 'Ashin Vimala',
    year: '2022',
    pdfUrl: '/research/impact-theravada-mon.pdf'
  }
];
