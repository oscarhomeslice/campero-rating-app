const fs = require('fs');

console.log('🎨 Starting complete branding update for Choque Campero...');

// 1. Update login page
console.log('📝 Updating login page...');
let loginContent = fs.readFileSync('src/app/auth/login/page.tsx', 'utf8');

// Add Image import if not already present
if (!loginContent.includes('import Image from')) {
  loginContent = loginContent.replace(
    "import Link from 'next/link';",
    "import Link from 'next/link';\nimport Image from 'next/image';"
  );
}

// Replace the header section with logo and mascot
loginContent = loginContent.replace(
  `        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="https://i.postimg.cc/VkLFZ0Hw/Logo-no-border-1.webp"
            alt="Choque Campero Logo"
            width={240}
            height={80}
            className="mx-auto max-w-[240px] h-auto"
          />
        </div>

        {/* Mascot */}
        <div className="text-center mb-6">
          <Image
            src="https://i.postimg.cc/SQM1c9Ht/El-Camperon-transparent-1.webp"
            alt="El Camperón"
            width={160}
            height={160}
            className="mx-auto max-w-[160px] h-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Sign in to continue rating camperos</p>
        </div>`,
  `        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="https://i.postimg.cc/VkLFZ0Hw/Logo-no-border-1.webp"
            alt="Choque Campero Logo"
            width={240}
            height={80}
            className="mx-auto max-w-[240px] h-auto"
          />
        </div>

        {/* Mascot */}
        <div className="text-center mb-6">
          <Image
            src="https://i.postimg.cc/SQM1c9Ht/El-Camperon-transparent-1.webp"
            alt="El Camperón"
            width={160}
            height={160}
            className="mx-auto max-w-[160px] h-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Sign in to continue rating camperos</p>
        </div>`
);

fs.writeFileSync('src/app/auth/login/page.tsx', loginContent);

// 2. Update register page
console.log('📝 Updating register page...');
let registerContent = fs.readFileSync('src/app/auth/register/page.tsx', 'utf8');

// Add Image import if not already present
if (!registerContent.includes('import Image from')) {
  registerContent = registerContent.replace(
    "import Link from 'next/link';",
    "import Link from 'next/link';\nimport Image from 'next/image';"
  );
}

// Replace the header section with logo and mascot
registerContent = registerContent.replace(
  `        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            🌮 Join the Competition!
          </h1>
          <p className="text-gray-600">Create your account to start rating camperos</p>
        </div>`,
  `        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="https://i.postimg.cc/VkLFZ0Hw/Logo-no-border-1.webp"
            alt="Choque Campero Logo"
            width={240}
            height={80}
            className="mx-auto max-w-[240px] h-auto"
          />
        </div>

        {/* Mascot */}
        <div className="text-center mb-6">
          <Image
            src="https://i.postimg.cc/SQM1c9Ht/El-Camperon-transparent-1.webp"
            alt="El Camperón"
            width={160}
            height={160}
            className="mx-auto max-w-[160px] h-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Join the Competition!
          </h1>
          <p className="text-gray-600">Create your account to start rating camperos</p>
        </div>`
);

fs.writeFileSync('src/app/auth/register/page.tsx', registerContent);

// 3. Update layout.tsx with favicon and title
console.log('📝 Updating layout with favicon and title...');
let layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');

// Update metadata
layoutContent = layoutContent.replace(
  'title: "Campero Rating Competition"',
  'title: "Choque Campero"'
);

layoutContent = layoutContent.replace(
  'description: "Rate the best camperos in town! 7-day food competition."',
  'description: "Rate the best camperos in town! 7-day Choque Campero competition."'
);

// Add favicon to head if not already present
if (!layoutContent.includes('favicon-96x96.png')) {
  layoutContent = layoutContent.replace(
    '<html lang="en">',
    `<html lang="en">
      <head>
        <link rel="icon" href="https://i.postimg.cc/t4MFrSxd/favicon-96x96.png" type="image/png" sizes="96x96" />
      </head>`
  );
}

fs.writeFileSync('src/app/layout.tsx', layoutContent);

console.log('✅ Branding update completed!');
console.log('🎯 Updated:');
console.log('  - Login page with logo and mascot');
console.log('  - Register page with logo and mascot');
console.log('  - Layout with favicon and updated title');
console.log('  - Removed taco emoji from auth pages');
