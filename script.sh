npm run build
cp now.json build/now.json
cd build
now && now --target production
cd ..
