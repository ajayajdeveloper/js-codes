/**
 * Day 1 — Exercise
 *
 * Build a ProfileBadge component (~10 min)
 *
 * Requirements:
 * - Accept props: name (string), role (string), avatarUrl (string, optional)
 * - If no avatarUrl, show initials in a colored circle instead
 * - Show a green dot if isOnline prop is true
 * - Accept an onViewProfile callback prop, triggered by a "View Profile" button
 *
 * Then render 3 ProfileBadge components below with different data.
 *
 * Solution is in day-01-jsx-components-props/README.md (scroll to bottom).
 */

export default function Day1Exercise() {
  // TODO: define ProfileBadge component here
  function ProfileBadge({ name, role, avatarUrl, isOnline, onViewProfile}){
    return(
      <div>
        <img src = {avatarUrl || `https://ui-avatars.com/api/?name=${name}`}  alt="avatar"></img>
        <h3>{name}</h3>
        <p>{role}</p>
        {isOnline && <span style={{ color: 'green' }}>● Online</span>}
        <button onClick = {onViewProfile}>View Profile</button>
      </div>
    )
  }

  // TODO: render 3 ProfileBadge instances with different props
  return (
    <div>
      <ProfileBadge name = "John Doe" role = "Software Engineer" avatarUrl = "https://via.placeholder.com/150" isOnline = {true} onViewProfile = {() => alert('Viewing profile...')}/>
      <ProfileBadge name = "Jane Smith" role = "Product Manager" avatarUrl = "https://via.placeholder.com/150" isOnline = {false} onViewProfile = {() => alert('Viewing profile...')}/>
      <ProfileBadge name = "Jim Beam" role = "CEO" avatarUrl = "https://via.placeholder.com/150" isOnline = {true} onViewProfile = {() => alert('Viewing profile...')}/>
    </div>
  )
}
