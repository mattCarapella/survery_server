function localtunnel {
  lt -s alhfnis12341sdni -p 5000
}
until localtunnel; do
echo "******   ERROR:  localtunnel server crashed...   ******"
sleep 2
done