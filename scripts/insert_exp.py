# script to insert experience block
with open('/home/z/my-project/flight-deck/src/data/profile.ts', 'r') as f:
    lines = f.readlines()

new_block = """
  experience: {
    title: 'Full-Stack Developer \u2014 Mahdia Blue & Green Platform',
    org: 'Ordre des Ing\u00e9nieurs Tunisiens (OIT Mahdia)',
    label: 'Dec 2024 \u2013 May 2025 \u00b7 6 months',
    points: [
      'Developed a full-stack web application promoting sustainable blue, green, and circular-economy initiatives in Mahdia, Tunisia',
      'Built a monorepo architecture with React 19 / Vite frontend and Node.js / Express.js backend, connected via REST API',
      'Implemented article and event management, user authentication (JWT), a contact system, and slug-based routing',
      'Designed MongoDB/Mongoose data models, deployment scripts, and a shared types layer across workspaces',
    ],
    stack: ['React 19', 'React Router 7', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'],
  },

"""

# Insert before line 137 (index 136)
lines.insert(136, new_block)

with open('/home/z/my-project/flight-deck/src/data/profile.ts', 'w') as f:
    f.writelines(lines)

print('OK')
