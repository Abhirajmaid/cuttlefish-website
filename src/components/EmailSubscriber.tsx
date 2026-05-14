'use client';

import React, { useState } from 'react';
import { Heading } from './Heading';
import { Text } from './Text';
import { Button } from './Button';

export interface EmailSubscriberProps {
  /** Optional Tailwind gradient utilities (e.g. `from-pink-200 to-rose-100`). Omit for `.hero-framer-surface`. */
  backgroundGradient?: string;
}

export default function EmailSubscriber({ backgroundGradient }: EmailSubscriberProps) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  const useLegacyGradient = Boolean(backgroundGradient);

  const surfaceClass = useLegacyGradient
    ? `rounded-3xl border border-secondary/25 bg-linear-to-br ${backgroundGradient} overflow-hidden`
    : 'hero-framer-surface';

  return (
    <section className="mt-20 border-t border-gray-200 pt-16 md:mt-28 md:pt-20">
      <div
        className={`h-[calc(100vh*1.5)] relative z-10 flex flex-col justify-center px-6 py-16 md:px-10 md:py-20 ${surfaceClass}`}
      >
        <div className="flex flex-col items-center justify-center gap-6 lg:gap-8">
          <div className="space-y-4 text-center">
            <Text variant="label" className="text-gray-500">
              INSIDER EDITION
            </Text>
            <Heading
              level={1}
              className="max-w-2xl text-balance font-gambetta-italic-500 text-2xl leading-snug md:text-3xl"
            >
              Be the first to know <span className="font-gambetta-italic">about exclusive</span> new arrivals.
            </Heading>
          </div>
          <div className="flex flex-col items-center justify-end space-y-6">
            <Text className="max-w-2xl text-center text-gray-600">
              Want access to our latest collections before everyone else? Join the Insider Edition for exclusive drops and
              discover the perfect blend of comfort and style.
            </Text>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex max-w-md flex-col gap-3 rounded-full border-2 border-primary bg-white p-0.5 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="insider-email" className="sr-only">
                Email
              </label>
              <input
                id="insider-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="min-h-12 flex-1 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none"
              />
              <Button
                type="submit"
                variant="primary"
                className="!rounded-full !text-black px-8 sm:shrink-0 bg-linear-to-b! from-primary to-[#e9bdcb]"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
