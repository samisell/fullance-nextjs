"use client";
import Image from 'next/image';
import Link from 'next/link';
import { findImage } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const articles = [
  {
    title: 'Why you should invest in real estate',
    authorName: 'Samuel Jackson',
    authorImageId: 'author-avatar-1',
    articleImageId: 'leader-with-money',
    category: 'Real Estate',
    link: '#',
    hint: 'investment property'
  },
  {
    title: 'How to secure your first home',
    authorName: 'Ronke Lawal',
    authorImageId: 'author-avatar-2',
    articleImageId: 'leader-with-keys',
    category: 'Home Ownership',
    link: '#',
    hint: 'first home'
  }
];

const animation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function FeaturedProperties() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container max-w-7xl">
        <motion.h2 
            {...animation} 
            transition={{ duration: 0.5 }} 
            className="text-3xl font-bold text-center text-primary mb-12"
        >
          Insights from our thought leaders
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => {
            const articleImage = findImage(article.articleImageId);
            const authorImage = findImage(article.authorImageId);
            return (
              <motion.div 
                key={article.title} 
                {...animation} 
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    {articleImage && (
                      <div className="relative aspect-video">
                        <Image src={articleImage.url} alt={article.title} fill className="object-cover" data-ai-hint={article.hint}/>
                        <div className="absolute top-4 left-4">
                          <Button asChild size="sm" className="bg-primary/80 backdrop-blur-sm">
                            <Link href={article.link}>{article.category}</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-4">{article.title}</h3>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {authorImage && <AvatarImage src={authorImage.url} alt={article.authorName} />}
                          <AvatarFallback>{article.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-muted-foreground">{article.authorName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
