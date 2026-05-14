'use client';

import { ReactNode, useState } from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import { Section } from './Section';
import { Container } from './Container';
import { Button } from './Button';

interface AboutSectionProps {
  title: ReactNode;
}

const ABOUT_COPY = `When searching for comfortable, stylish women's footwear, we kept running into the same problems: shoes that look great but hurt your feet, or incredibly comfortable shoes that sacrifice style and elegance.

Finding the perfect balance felt like an impossible task. We believe it should not be this way. Shopping for footwear should feel exciting, rewarding, and above all, guarantee lasting comfort for your everyday life.`;

const ABOUT_COPY_EXTENDED = `The truth is, the modern footwear industry often ignores comfort in favor of passing trends.

Too often, brands cut corners on materials, leaving you with stiff, unforgiving shoes that lead to aches and blisters. Poor arch support and narrow toe boxes turn what seemed like a beautiful pair of shoes into a disappointing mistake.

That is exactly why we built Cuttle Fish. Every shoe in our collection is crafted with meticulous attention to ergonomics, using premium materials and supportive designs, so you know exactly what you are getting. No surprises, no compromises, just beautiful, incredibly cozy footwear that makes sense for your lifestyle.`;

export const AboutSection = ({ title }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const aboutParagraphs = [
    ABOUT_COPY,
    ...(isExpanded ? [ABOUT_COPY_EXTENDED] : []),
  ]
    .join('\n\n')
    .split('\n\n');

  return (
    <Section className="py-12 md:py-16">
      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4 lg:col-span-1">
            <Text variant="label">ABOUT US</Text>
            <Heading level={3} className="font-gambetta leading-tight">
              {title}
            </Heading>
          </div>

          <div className="space-y-8 lg:col-span-1 px-6">
            <div className="w-4/5 space-y-4">
              {aboutParagraphs.map((paragraph, index) => (
                <Text key={index} className="text-gray-700">
                  {paragraph}
                </Text>
              ))}
            </div>
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              variant="ghost"
              className="w-fit whitespace-nowrap -translate-x-6"
            >
              {isExpanded ? 'Show less' : 'Read the manifesto'}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
