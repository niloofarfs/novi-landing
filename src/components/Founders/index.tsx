import Image from 'next/image';
import type { CSSProperties } from 'react';

import { Reveal } from '@/components/Reveal';
import { founders } from '@/content/site';

import styles from './Founders.module.css';

export function Founders() {
  return (
    <Reveal className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow} data-reveal-item>
          {founders.eyebrow}
        </p>
        <h2
          className={styles.heading}
          data-reveal-item
          style={{ '--reveal-delay': '60ms' } as CSSProperties}
        >
          {founders.heading}
        </h2>
        <p
          className={styles.intro}
          data-reveal-item
          style={{ '--reveal-delay': '120ms' } as CSSProperties}
        >
          {founders.intro}
        </p>

        <ul className={styles.grid}>
          {founders.people.map((person, i) => (
            <li
              key={person.photo}
              className={styles.card}
              data-reveal-item
              style={{ '--reveal-delay': `${160 + i * 90}ms` } as CSSProperties}
            >
              <div className={styles.portrait}>
                <Image
                  src={person.photo}
                  alt={`${person.name}, ${person.role}`}
                  width={108}
                  height={130}
                  sizes="108px"
                />
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.bio}>{person.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
